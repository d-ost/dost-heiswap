import BigNumber from "bignumber.js";
import Account from "./Account";
import {ORIGIN_GAS_PRICE} from "../utils/Constants";

export enum TransactionType {
  baseTokenTransfer = 'baseTokenTransfer',
  erc20TokenTransfer = 'erc20TokenTransfer',
}

export default class Transaction {

  transactionHash: string;
  transactionType: TransactionType;
  data: {
    from: Account,
    to: string,
    amount: string
  };

  constructor(transactionHash, transactionType, data) {
    this.transactionHash = transactionHash;
    this.transactionType = transactionType;
    this.data = data;
  }

  /**
   * It provides transactions history from stringified json object.
   * @param jsonTransactions It contains Transaction data in JSON format.
   *
   * @returns Array of Transactions.
   */
  static fromJSON(jsonTransactions: string): Transaction[] {

    const parsedTransactions: Transaction[] = Object.assign(JSON.parse(jsonTransactions));
    let transactions: Transaction[] = [];

    for (let i = 0; i < parsedTransactions.length; i++) {
      const transactionObj = new Transaction(
        parsedTransactions[i].transactionHash,
        parsedTransactions[i].transactionType,
        parsedTransactions[i].data,
      );
      transactions.push(transactionObj);
    }

    return transactions;
  }

  static transferBaseToken(fromAccount: Account, toAddress: string, amount: string):
    Promise<string> {
    console.log(
      'from Address: ', fromAccount,
      'toAddress: ', toAddress, 'amount: ',
      amount
    );
    const web3 = window.web3;
    console.log('Metamask web3:', web3);

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
        gas: 21000,
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

  static sendERC20Token() {

  }
}