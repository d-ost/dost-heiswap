import Web3 from 'web3';
import {LocalStorage} from "../services/LocalStorage";
const Web3Utils = require('web3-utils');

export default class Account {
  static KeyType = {
    MIXER: 'mixerkey',
    BURNER: 'burnerkey',
  };
  static validatePrivateKey(privateKey) {
    if (!privateKey || !/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
      //fixme: Dont include private key in the execption;
      throw new Error(`Invalid Private Key "${privateKey}"`);
    }
  }

  static fromPrivateKey(privateKey) {
    Account.validatePrivateKey(privateKey);
    return (new Web3()).eth.accounts.privateKeyToAccount(privateKey);
  }

  static new() {
    return (new Web3()).eth.accounts.create();
  }

  static store(account, keyType) {
    console.log('keyType: ', keyType);
    if (keyType !== Account.KeyType.MIXER && keyType !== Account.KeyType.BURNER) {
      throw new Error(`Unknown key type: ${keyType}`);
    }
    if (!Web3Utils.isAddress(account.address)) {
      throw new Error(`Unknown account address: ${account.address}`);
    }
    Account.validatePrivateKey(account.privateKey);

    // Store in to local storage.
    return true;
  }

  static getAccounts() {
    // TODO: This will be changed;
    return Account.new();
  }

  static getBurnerAddresses() {
    return LocalStorage.getBurnerAddresses();
  }

  static createNewBurnerKey() {
    const account = Account.new();
    LocalStorage.storeBurnerAddress(account.address, account.privateKey);
    return account;
  }

  static getBucketAddress() {
      return LocalStorage.getBucketAddresses();
  }

  static createNewBucketKey(pin){
    const account = Account.new();
    const encryptedKey = Account.encrypt(JSON.stringify(account.privateKey), pin);
    LocalStorage.storeBucketAddress(account.address, encryptedKey);
    return account;
  }


  static encrypt(text, key) {
    // TODO;
    return text;
  }

}

