// Copyright 2019 LeapDAO.org MIT
// github.com/leapdao/plasma-burner-wallet

class LocalStorage {

  static BURNER: string = 'burner';
  static BUCKET: string = 'bucket';
  static BURNER_TRANSACTION_HASH: string = 'burner_transactions';
  static BUCKET_TRANSACTION_HASH: string = 'bucket_transactions';


  refetchBurner: boolean;
  refetchBucket: boolean;
  burnerAddressCache: string[];
  bucketAddressCache: string[];

  constructor() {
    this.refetchBucket = true;
    this.refetchBurner = true;
    this.burnerAddressCache = [];
    this.bucketAddressCache = [];
  }

  getFromLocalStorage(key: string): any {
    const burnerJSON = localStorage.getItem(key);
    let burnerObject = {};
    if (burnerJSON) {
      burnerObject = JSON.parse(burnerJSON);
    }
    return burnerObject;
  }

  getBurnerAddresses(): string[] {
    if (this.refetchBurner) {
      const burnerObject = this.getFromLocalStorage(LocalStorage.BURNER);
      this.burnerAddressCache = Object.keys(burnerObject);
      this.refetchBurner = false;
    }
    return this.burnerAddressCache;

  }

  storeBurnerAddress(address: string, privateKey: string) {
    this.refetchBurner = true;
    const burnerObject = this.getFromLocalStorage(LocalStorage.BURNER);
    burnerObject[address] = privateKey;
    localStorage.setItem(LocalStorage.BURNER, JSON.stringify(burnerObject));
  }

  getBucketAddresses():string[] {
    if (this.refetchBucket) {
      const bucketObject = this.getFromLocalStorage(LocalStorage.BUCKET);
      this.bucketAddressCache = Object.keys(bucketObject);
      this.refetchBucket = false;
    }
    return this.bucketAddressCache;
  }

  storeBucketAddress(address: string, encryptedPrivateKey: string) {
    this.refetchBucket = true;
    const bucketObject = this.getFromLocalStorage(LocalStorage.BUCKET);
    bucketObject[address] = encryptedPrivateKey;
    localStorage.setItem(LocalStorage.BUCKET, JSON.stringify(bucketObject));
  }

  getBurnerTransactions() {
    const transactions = this.getFromLocalStorage(LocalStorage.BURNER_TRANSACTION_HASH);
    return transactions || {};
  }

  getBucketTransactions() {
    const transactions = this.getFromLocalStorage(LocalStorage.BUCKET_TRANSACTION_HASH);
    return transactions || {};
  }

  storeBurnerTransaction(transactionHash: string, transactionData: boolean) {
    const transactions = this.getFromLocalStorage(LocalStorage.BURNER_TRANSACTION_HASH);
    transactions[transactionHash] = transactionData;
    localStorage.setItem(LocalStorage.BURNER_TRANSACTION_HASH, JSON.stringify(transactions));
  }

  burnBurnerAddress(address: string) {
    this.refetchBurner = true;
    const burnerObject = this.getFromLocalStorage(LocalStorage.BURNER);
    delete burnerObject[address];
    localStorage.setItem(LocalStorage.BURNER, JSON.stringify(burnerObject));
  }

  burnBucketAddress(address: string) {
    this.refetchBucket = true;
    const bucketObject = this.getFromLocalStorage(LocalStorage.BUCKET);
    delete bucketObject[address];
    localStorage.setItem(LocalStorage.BUCKET, JSON.stringify(bucketObject));
  }

  deleteBurnerTransaction(transactionHash: string) {
    const transactions = this.getFromLocalStorage(LocalStorage.BURNER_TRANSACTION_HASH);
    delete transactions[transactionHash];
    localStorage.setItem(LocalStorage.BURNER_TRANSACTION_HASH, JSON.stringify(transactions));
  }

  deleteBucketTransaction(transactionHash: string) {
    const transactions = this.getFromLocalStorage(LocalStorage.BUCKET_TRANSACTION_HASH);
    delete transactions[transactionHash];
    localStorage.setItem(LocalStorage.BUCKET_TRANSACTION_HASH, JSON.stringify(transactions));
  }

  getPrivateKeyForBurnerAddress(address: string) {
    const burnerObject = this.getFromLocalStorage(LocalStorage.BURNER);
    return burnerObject[address];
  }

  getPrivateKeyForBucketAddress(address: string) {
    const bucketObject = this.getFromLocalStorage(LocalStorage.BUCKET);
    return bucketObject[address];
  }

  getPinHash() {
    return localStorage.getItem('pin');
  }

  deletePinHash() {
    return localStorage.removeItem('pin');
  }
}

export default new LocalStorage();
