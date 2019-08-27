import Account from "./Account";
import {BASETOKEN_TRANSFER_GAS, ORIGIN_GAS_PRICE} from "../utils/Constants";
import BigNumber from "bignumber.js";

export enum TransactionType {
  baseTokenTransfer = 'baseTokenTransfer',
  erc20TokenTransfer = 'erc20TokenTransfer',
  heiswapDeposit = 'heiswapDeposit',
  heiswapWithdraw = 'heiswapWithdraw',
  baseTokenTopup = 'baseTokenTopup',
}

export default class Transaction {

  transactionHash: string;
  transactionType: TransactionType;
  data: {
    from: Account,
    to: string,
    amount: string
  };

  constructor(transactionHash: string, transactionType: TransactionType, data: {
    from: Account;
    to: string;
    amount: string;
  }) {
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
}
