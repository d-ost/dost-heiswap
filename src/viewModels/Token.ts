import Account, {AccountType} from "./Account";
import BigNumber from "bignumber.js";
import Transaction, {TransactionType} from "./Transaction";
import {HeiswapToken} from "../services/Heiswap/Heiswap";
import {BASETOKEN_TRANSFER_GAS, ORIGIN_GAS_PRICE} from "../utils/Constants";

export default class Token {

  symbol: string;
  name: string;
  isBaseCurrency: boolean;
  erc20Address?: string;
  accounts: Account[];
  transactions: Transaction[];
  heiswapTokens: HeiswapToken[];

  constructor(
    symbol: string,
    name: string,
    isBaseCurrency: boolean,
    erc20Address?: string,
    accounts?: Account[],
    transactions?: Transaction[],
    heiswapToken?: HeiswapToken[],
  ) {
    this.symbol = symbol;
    this.name = name;
    this.isBaseCurrency = isBaseCurrency;
    this.erc20Address = erc20Address;
    this.accounts = accounts || [];
    this.transactions = transactions || [];
    this.heiswapTokens = heiswapToken || [];
  }

  addAccount(account: Account) {
    if (this.accounts.filter(a => a.address === account.address).length === 0)
      this.accounts.push(account);
  }

  removeAccount(account: Account) {
    for(let index = 0; index < this.accounts.length; index += 1) {
      if( this.accounts[index].match(account) ) {
        // Remove account
        this.accounts.splice(index, 1);
        break;
      }
    }
  }

  replaceAccount(updatedAccount: Account): Account[] {
    const updatedAccounts = this.accounts.map((existingAccount): Account => {
      if (existingAccount.match(updatedAccount)) {
        return updatedAccount;
      }
      return existingAccount;
    });
    return updatedAccounts;
  }

  match(token): boolean {
    return this.symbol === token.symbol;
  }


  getBurnerBalance(): string {
    return this.accounts
      .filter(account => account.accountType === AccountType.burner)
      .map(account => account.balance)
      .reduce((accumulator, balance) => balance.add(accumulator), new BigNumber('0')).toString(10);
  }

  getBucketBalance(): string {
    return this.accounts
      .filter(account => account.accountType === AccountType.bucket)
      .map(account => account.balance)
      .reduce((accumulator, balance) => balance.add(accumulator), new BigNumber('0')).toString(10);
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  addHeiswapToken(heiswapToken: HeiswapToken): void {
    const tokens = this.heiswapTokens.filter(ht => ht.txHash !== heiswapToken.txHash);
    tokens.push(heiswapToken);
    this.heiswapTokens = tokens;
  }

  async transfer(accountType, amount, beneficiary): Promise<Transaction[]> {
    const fundedAccounts = this.getFundedBurnerAccounts(amount);
    let transactions: Transaction[] = [];
    for(let i=0; i< fundedAccounts.length; i++ ){
      const burnerAccount = fundedAccounts[i].account;
      const transactionAmount = fundedAccounts[i].amount.toString(10);
      const txHash = await this.sendTransaction(
        burnerAccount,
        beneficiary,
        transactionAmount,
      );
      const transaction =  new Transaction(txHash, TransactionType.baseTokenTransfer, {
        from: burnerAccount,
        to: beneficiary,
        amount: amount,
      });
      transactions.push(transaction);
    }
    return transactions;
  }

  // Filter the account by type Burner.
  // Sort burner accounts by increasing order of balance
  // Loop over burner accounts.
  // Check if burner accounts have sufficient balance
  // Collect multiple burner accounts for sending transaction if needed
  // Loop ends
  // if burner accounts balance is not sufficient => Return error
  // else return list of burner accounts.
  private getFundedBurnerAccounts(transferAmount): {account: Account, amount: BigNumber}[] {
    const sortedBurnerAccounts = this.getSortedAccounts();
    const gasNeeded = this.baseTokenTransferGasUsed();
    let remainingTransferAmount = (new BigNumber(transferAmount));
    let burnerAccountsToUse: {account: Account, amount: BigNumber}[] = [];
    for (let i = sortedBurnerAccounts.length-1; i >= 0; i -= 1) {
      const fundNeeded = remainingTransferAmount.add(gasNeeded);
      let transactionAmount;
      if(sortedBurnerAccounts[i].balance.lte(new BigNumber(0))){
        break;
      } else if(sortedBurnerAccounts[i].balance.gte(fundNeeded)) {
        transactionAmount = remainingTransferAmount;
        remainingTransferAmount = new BigNumber(0);
      } else {
        // Amount utilized will be (burner account balance minus gasNeeded)
        transactionAmount = (sortedBurnerAccounts[i].balance).minus(gasNeeded);
        remainingTransferAmount = remainingTransferAmount.minus(transactionAmount);
      }
      console.log(`accountToUse:`, sortedBurnerAccounts[i]);
      console.log(`Remaining transfer amount`, remainingTransferAmount.toString(10));
      burnerAccountsToUse.push({
        account: sortedBurnerAccounts[i],
        amount: transactionAmount,
      });
      if(remainingTransferAmount.lte(new BigNumber(0))){
        break;
      }
    }
    console.log('burnerAccountsToUse:', burnerAccountsToUse);
    if (burnerAccountsToUse.length === 0 || remainingTransferAmount.gt(new BigNumber(0))) {
      throw new Error('Non Availability of funded burner accounts.');
    }
    return burnerAccountsToUse;
  }

  private sendTransaction(fromAccount: Account, toAddress: string, amount: string):
    Promise<string> {
    const web3 = window.web3;

    return new Promise(async (onResolve, onReject): Promise<void> => {
      if (!fromAccount.privateKey) {
        onReject('From Account can"t be unlocked');
      }
      const web3FromAccount = web3.eth.accounts.privateKeyToAccount(fromAccount.privateKey!);
      web3.eth.accounts.wallet.add(web3FromAccount);
      web3.transactionConfirmationBlocks = 2;
      web3.eth.sendTransaction({
        from: fromAccount.address,
        to: toAddress,
        value: amount,
        gas: BASETOKEN_TRANSFER_GAS,
        gasPrice: ORIGIN_GAS_PRICE,
      }).on('transactionHash', (transactionHash) => {
        console.log('transactionHash  ', transactionHash);
        onResolve(transactionHash);
      }).on('error', (error) => {
        console.log('error  ', error);
        onReject(error);
      });
    });
  }

  private baseTokenTransferGasUsed() {
    const gasPriceBN = new BigNumber(ORIGIN_GAS_PRICE);
    const gasBN = new BigNumber(BASETOKEN_TRANSFER_GAS);
    return gasPriceBN.mul(gasBN);
  }

  private compareAccountBalance(account1, account2 ): number {
    if ( account1.balance.lt(account2.balance)){
      return -1;
    }
    if ( account1.balance.gt(account2.balance) ){
      return 1;
    }
    return 0;
  }

  private getSortedAccounts(): Account[] {
    const burnerAccounts = this.accounts.filter(
      account => account.accountType === AccountType.burner
    );
    // Sort by increasing order
    const sortedBurnerAccounts = burnerAccounts.sort( this.compareAccountBalance );
    console.log(`sortedAccounts`, sortedBurnerAccounts);
    return sortedBurnerAccounts;
  }

  static getAll() {
    return [
      new Token(
        'ETH',
        'Ether',
        true
      ),

      // new Token(
      //   'OST',
      //   'Simple Token',
      //   false,
      //   '0xeaa192d486ac5243886a28001e27a68cae5fde4b'
      // ),
      // new Token(
      //   'wEth',
      //   'Wrapped Eth',
      //   false,
      //   '0xeaa192d486ac5243886a28001e27a68cae5fde4b'
      // )
    ];
  }


  /**
   * For bucket key add account to all tokens.
   * Bucket account can hold multiple tokens.
   * For Burner account add account to specific token.
   */
  static addAccountToTokens(tokens: Token[], account: Account): Token[] {
    const updatedTokens = tokens.map((t): Token => {
      t.addAccount(account.clone());
      return t;
    });
    return updatedTokens;
  }

  /**
   * For bucket account remove account from all tokens.
   * Bucket account can hold multiple tokens.
   * For Burner account remove account from specific token.
   */
  static removeAccountFromTokens(tokens: Token[], account: Account): Token[] {
    // For bucket account
    const updatedTokens = tokens.map((t): Token => {
      t.removeAccount(account);
      return t;
    });
    return updatedTokens;
  }

  static replaceToken(tokens: Token[], updatedToken: Token): Token[] {
    const updatedTokens = tokens.map((existingToken): Token => {
      if (existingToken.match(updatedToken)) {
        return updatedToken;
      }
      return existingToken;
    });
    return updatedTokens;
  }

  /**
   * It provides tokens object from stringified json object.
   * @param tokens It contains Token data in stringified format.
   * @returns Array of tokens.
   */
  static fromJSON(tokens: string): Token[] {

    let listOfToken: Token[] = [];
    const parsedTokens: Token[] = Object.assign(JSON.parse(tokens));

    for (let i = 0; i < parsedTokens.length; i++) {
      const accounts = parsedTokens[i].accounts.map(a => {
        const account = new Account(a.accountType, a.address,  a.isReceiveKey, a.privateKey);
        account.setBalance(new BigNumber(a.balance));
        return account;
      });

      const transactions = parsedTokens[i].transactions.map(t =>
        new Transaction(t.transactionHash, t.transactionType, t.data)
      );
      const tokenObj = new Token(
        parsedTokens[i].symbol,
        parsedTokens[i].name,
        parsedTokens[i].isBaseCurrency,
        parsedTokens[i].erc20Address,
        accounts,
        transactions,
        parsedTokens[i].heiswapTokens,
      );
      listOfToken.push(tokenObj);
    }

    return listOfToken;

  }
}
