import Web3 from "web3";
import localStorage from "../services/LocalStorage";
import {Account as Web3Account} from 'web3-eth-accounts';

export class Account {

  static new(): Web3Account {
    return (new Web3('')).eth.accounts.create();
  }

  static fromPrivateKey(privateKey): Web3Account {
    //Account.validatePrivateKey(privateKey);
    return (new Web3('')).eth.accounts.privateKeyToAccount(privateKey);
  }

  static getBurnerAddresses(): string[] {
    return localStorage.getBurnerAddresses();
  }

  static createNewBurnerKey(): Web3Account {
    const account = Account.new();
    localStorage.storeBurnerAddress(account.address, account.privateKey);
    return account;
  }

  // static getBucketAddress(): string[] {
  //   return localStorage.getBucketAddresses();
  // }

  // static createNewBucketKey(pin): Web3Account {
  //   const account = Account.new();
  //   const encryptedKey = Account.encrypt(JSON.stringify(account.privateKey), pin);
  //   localStorage.storeBucketAddress(account.address, encryptedKey.toString());
  //   return account;
  // }

  static encrypt(text, key): string {
    return new Web3('').eth.accounts.encrypt(text, key).toString();
  }
}
