// Copyright 2019 LeapDAO.org MIT
// github.com/leapdao/plasma-burner-wallet

const getFieldName = (name, account) => (account ? `${account}${name}` : name);

export const getStoredValue = (name, account) =>
  localStorage.getItem(getFieldName(name, account));

export const storeValues = (params, account) => {
  const keys = Object.keys(params);
  const values = Object.values(params);
  keys.forEach((key, index) => {
    const value = values[index];
    const name = getFieldName(key, account);
    localStorage.setItem(name, value);
  });
};

export const eraseStoredValue = (name, account) =>
  localStorage.removeItem(getFieldName(name, account));


const BURNER = 'burner';
const BUCKET = 'bucket';
const BURNER_TRANSACTION_HASH = 'burner_transactions';
const BUCKET_TRANSACTION_HASH = 'bucket_transactions';

let burnerAddressCache;
let bucketAddressCache;
const refechFlag = {
  burner: true,
  bucket: true
};
export class LocalStorage {
  static getFromLocalStorage(key) {
    const burnerJSON = localStorage.getItem(key);
    let burnerObject = {};
    if (burnerJSON) {
      burnerObject = JSON.parse(burnerJSON) ;
    }
    return burnerObject;
  }
  static getBurnerAddresses() {
    if (refechFlag.burner) {
      const burnerObject = this.getFromLocalStorage(BURNER);
      burnerAddressCache =  Object.keys(burnerObject);
      refechFlag.burner = false;
    }
    return burnerAddressCache;

  }

  static storeBurnerAddress(address, privateKey) {
    refechFlag.burner = true;
    const burnerObject = this.getFromLocalStorage(BURNER);
    burnerObject[address] = privateKey;
    localStorage.setItem(BURNER, JSON.stringify(burnerObject));
  }

  static getBucketAddresses() {
    if (refechFlag.bucket) {
      const bucketObject = this.getFromLocalStorage(BUCKET);
      bucketAddressCache = Object.keys(bucketObject);
      refechFlag.bucket = false;
    }
    return bucketAddressCache;
  }

  static storeBucketAddress(address, encryptedPrivateKey) {
    refechFlag.bucket = true;
    const bucketObject = this.getFromLocalStorage(BUCKET);
    bucketObject[address] = encryptedPrivateKey;
    localStorage.setItem(BUCKET, JSON.stringify(bucketObject));
  }

  static getBurnerTransactions() {
    const transactions = this.getFromLocalStorage(BURNER_TRANSACTION_HASH);
    return transactions || {};
  }
  static getBucketTransactions() {
    const transactions = this.getFromLocalStorage(BUCKET_TRANSACTION_HASH);
    return transactions || {};
  }
  static storeBurnerTransaction(transactionHash, transactionData) {
    const transactions = this.getFromLocalStorage(BURNER_TRANSACTION_HASH);
    transactions[transactionHash] = transactionData;
    localStorage.setItem(BURNER_TRANSACTION_HASH, JSON.stringify(transactions));
  }
  static storeBucketTransaction(transactionHash, transactionData) {
    const transactions = this.getFromLocalStorage(BUCKET_TRANSACTION_HASH);
    transactions[transactionHash] = transactionData;
    localStorage.setItem(BUCKET_TRANSACTION_HASH, JSON.stringify(transactions));
  }

  static burnBurnerAddress(address) {
    refechFlag.burner = true;
    const burnerObject = this.getFromLocalStorage(BURNER);
    delete burnerObject[address];
    localStorage.setItem(BURNER, JSON.stringify(burnerObject));
  }

  static burnBucketAddress(address) {
    refechFlag.bucket = true;
    const bucketObject = this.getFromLocalStorage(BUCKET);
    delete bucketObject[address];
    localStorage.setItem(BUCKET, JSON.stringify(bucketObject));
  }

  static deleteBurnerTransaction(transactionHash) {
    const transactions = this.getFromLocalStorage(BURNER_TRANSACTION_HASH);
    delete transactions[transactionHash];
    localStorage.setItem(BURNER_TRANSACTION_HASH, JSON.stringify(transactions));
  }

  static deleteBucketTransaction(transactionHash) {
    const transactions = this.getFromLocalStorage(BUCKET_TRANSACTION_HASH);
    delete transactions[transactionHash];
    localStorage.setItem(BUCKET_TRANSACTION_HASH, JSON.stringify(transactions));
  }

  static getPinHash() {
    return localStorage.getItem('pin');
  }

  static deletePinHash() {
    return localStorage.removeItem('pin');
  }
}
