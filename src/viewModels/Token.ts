import Account, {AccountType} from "./Account";
import BigNumber from "bignumber.js";
import Transaction from "./Transaction";
import {HeiswapToken} from "../services/Heiswap/Heiswap";

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
