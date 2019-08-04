import BN from "bn.js";
import {LocalStorage} from "../services/LocalStorage";

const Web3Utils = require('web3-utils');

export default class BaseToken {
  constructor(symbol,  web3){
    this.web3 = web3;
    this.symbol = symbol;
    // This will store the balances for each address
    this.balances = {};
    this.totalBalances = {};
    // Load from the local storage.
    this.loadInfoFromLocalStorage();

    // Bind the functions.
    this.getBalance.bind(this);
  }

  async getBalances(addresses, context) {
    const allBalanceRequest = [];
    addresses.forEach((address) => {
      allBalanceRequest.push(this.getBalance(address));
    });
    let totalBalance = new BN(0);
    Promise.all(allBalanceRequest).then((result) => {
      totalBalance.add(new BN(result));
      this.totalBalances[context] = totalBalance.toString(10);
    });
  }
  async getBalance(address) {
    const balance = await this.web3.eth.getBalance(address);
    this.balances[address] = balance;
    return balance;
  }

  loadInfoFromLocalStorage(){
    // This will load from local storage.
    // If its not present in local storage, get it from contract.
  }

  saveBalance(address) {
    // This will call local storage.
  }
  static from(symbol, web3) {
    if (!web3) {
      throw new Error('Web3 is undefined');
    }
    return new BaseToken(symbol, web3);
  }

  getFromAddress(amount, context) {
    const addresses = LocalStorage.getBurnerAddresses();
    // TODO: write the address selection logic here
    return addresses[0]
  };

  async send(to, amount, context) {

    console.log('to', to);
    console.log('amount', amount);
    console.log('context', context);

    const fromAddress = this.getFromAddress(amount, context);

    if(!Web3Utils.isAddress(to)) {
      throw new Error('Invalid to address');
    }

    // TODO: remove the hardcoded values.
    let gasLimit = 60000;

    const tx = {
      "from":fromAddress,
      "to":to,
      "value":amount,
      "gas": gasLimit,
      "gasPrice": Math.round(5 * 1010101010)
    };

    const privateKey = LocalStorage.getPrivateKeyForBurnerAddress(fromAddress);
    return new Promise((resolve, reject) => {
      let transactionHash;
      let result;
      this.web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
        this.web3.eth.sendSignedTransaction(signed.rawTransaction)
          .on('transactionHash',(hash) => {
            transactionHash = hash;
            console.log('transactionHash: ', transactionHash);
            LocalStorage.storeBurnerTransaction(transactionHash,'true');
          })
          .on('receipt', (receipt)=>{
            // TODO: check the status from the receipt
            result = true;
          }).on('error',(error)=>{
            result = true;
          });
      });
      resolve(
        {
          transactionHash: transactionHash,
          result: result
        }
      );
    });
  }

}
