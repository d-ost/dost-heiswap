import Web3 from "web3";
import localStorage from "../services/LocalStorage";

export class Account {

  static new() {
    return (new Web3('')).eth.accounts.create();
  }

  static fromPrivateKey(privateKey) {
    //Account.validatePrivateKey(privateKey);
    return (new Web3('')).eth.accounts.privateKeyToAccount(privateKey);
  }

  static getBurnerAddresses() {
    return localStorage.getBurnerAddresses();
  }

  static createNewBurnerKey() {
    const account = Account.new();
    localStorage.storeBurnerAddress(account.address, account.privateKey);
    return account;
  }

  static getBucketAddress() {
    return localStorage.getBucketAddresses();
  }

  static createNewBucketKey(pin) {
    const account = Account.new();
    const encryptedKey = Account.encrypt(JSON.stringify(account.privateKey), pin);
    localStorage.storeBucketAddress(account.address, encryptedKey.toString());
    return account;
  }

  static encrypt(text, key) {
    return new Web3('').eth.accounts.encrypt(text, key).toString();
  }
}
