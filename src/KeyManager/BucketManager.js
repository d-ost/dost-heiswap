// store private keys, cached balances
// store how many keys, how many burners, how many

import { getStoredValue, storeValues, eraseStoredValue } from "../services/LocalStorage";
const Web3Utils = require('web3-utils');

const keyNumberBuckets = "NumberBuckets";
const keyCachedBalance = "BucketCachedBalance";
const keyCachedTotalBalance = "BucketsCachedTotalBalance";
const generateNBuckets = 1;

export default class BucketManager {
  // password is derived from 6digit PIN
  construct(password) {

    let _buckets = this.loadBuckets();

    if (_buckets == null) {
      this.numberBuckets = 0;
      this.hasBuckets = false;
      this.buckets = null;
    } else {
      this.numberBuckets = buckets.length;
      this.hasBuckets = true;
      this.buckets = _buckets;
    }
  }

  loadBuckets() {
    // TODO: also load cached balances
    let buckets;
    if (localStorage.length > 0) {
      let nStoredBuckets = localStorage.getItem(keyNumberBuckets);
      if (nStoredBuckets > 0) {
        buckets = this.loadBucketAddresses(nStoredBuckets);
        if (buckets.length == 0) {
          throw new Error(`Couldn't load bucket addresses from local storage.`);
        }
      } else {
        console.log('No buckets are stored yet.');
        buckets = null;
      }
    } else {
      console.log('No storage, and no buckets found.');
      buckets = null;
    }

    return buckets;
  }

  // try to load number of bucket addresses from local storage
  // and return array
  loadBucketAddresses(number) {
    let bucketAddresses = [];
    for (let i = 0; i < number; i++) {
      const bucketAddress = localStorage.getItem("bucketAddress-" + i.toString());
      if (bucketAddress != null) {
        if (!Web3Utils.isAddress(bucketAddress)) {
          throw new Error(`Unknown bucket account address: ${bucketAddress}`);
        }
        bucketAddresses.push(bucketAddress);
      }
    }

    return bucketAddresses;
  }
}