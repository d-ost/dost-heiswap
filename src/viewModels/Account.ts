import BigNumber from 'bignumber.js';

export enum AccountType {
  bucket = 'bucket',
  burner = 'burner',
}

export default class Account {

  accountType: AccountType;
  address: string;
  balance: BigNumber;
  isReceiveKey: boolean;
  privateKey?: string;

  constructor(
    accountType: AccountType,
    address: string,
    isReceiveKey: boolean,
    privateKey?: string,
  ) {
    this.accountType = accountType;
    this.address = address;
    this.balance = new BigNumber(0);
    this.isReceiveKey = isReceiveKey;
    this.privateKey = privateKey;
  }

  setBalance(balance: BigNumber) {
    this.balance = balance;
  }

  match(account): boolean {
    return this.address === account.address;
  }

  // Needed while add account to Tokens
  clone(): Account {
    const account = new Account(this.accountType, this.address, this.isReceiveKey, this.privateKey);
    account.setBalance(this.balance);
    return account;
  }

}
