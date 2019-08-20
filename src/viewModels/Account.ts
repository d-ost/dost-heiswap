import BigNumber from 'bignumber.js';

export enum AccountType {
  bucket = 'bucket',
  burner = 'burner',
}

export default class Account {

  accountType: AccountType;
  address: string;
  balance: BigNumber;
  privateKey?:string;

  constructor(
    accountType: AccountType,
    address: string,
    privateKey?:string,
  ) {
    this.accountType = accountType;
    this.address = address;
    this.balance = new BigNumber(0);
    this.privateKey = privateKey;
  }

  setBalance(balance: BigNumber) {
    this.balance = balance;
  }

  match(account): boolean {
    return this.address === account.address;
  }

}
