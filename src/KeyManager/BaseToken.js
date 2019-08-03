import BN from "bn.js";

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

  async send(burnerKey, receiverAddress, amount) {
    if(this.web3.utils.isAddress(receiverAddress)) {
      throw new Error('Invalid ');
    }
    const receipt = await this.web3.eth.sendTransaction({
      from: burnerKey,
      to: receiverAddress,
      value: await this.web3.utils.toWei(amount.toString(), 'ether')
    });

    console.log('receipt of send:- ',receipt);
  }

}
