const Web3Utils = require('web3-utils');

export default class BaseToken {
  constructor(address, web3){
    this.web3 = web3;

    // This will store the balances for each address
    this.balances = {};

    // Load from the local storage.
    this.loadInfoFromLocalStorage();

    // Bind the functions.
    this.getBalance.bind(this);
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
  static from(web3) {
    if (!web3) {
      throw new Error('Web3 is undefined');
    }
    return new BaseToken(web3);
  }
}
