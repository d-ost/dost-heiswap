import BigNumber from 'bignumber.js';

export enum AccountType {
  bucket = 'bucket',
  burner = 'burner',
}

export default class Account {

  accountType: AccountType;
  address: string;
  balance: BigNumber;

  constructor(
    accountType: AccountType,
    address: string,
  ) {
    this.accountType = accountType;
    this.address = address;
    this.balance = new BigNumber(0);
  }

  setBalance(balance: BigNumber) {
    this.balance = balance;
  }

  match(account): boolean {
    return this.address === account.address;
  }

}