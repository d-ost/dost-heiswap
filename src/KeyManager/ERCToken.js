import Web3 from 'web3';
const Web3Utils = require('web3-utils');
const abi = require('../abi/EIP20');

export default class ERCToken {
  constructor(address, web3){
    this.web3 = web3;
    this.address = address;
    this.contract = new this.web3.eth.Contract(abi,this.address);

    // This will store the balances for each address
    this.balances = {};

    // Following are the default strings.
    this.name = 'Loading token name . . .';
    this.symbol = 'Loading token symbol . . .';
    this.decimals = 'Loading token decimals . . .';

    // Load from the local storage.
    this.loadInfoFromLocalStorage();

    // Bind the functions.
    this.getBalance.bind(this);
    this.getTokenInfo.bind(this);
    this.getERCTokenBalance.bind(this);
    this.getSymbolFromContract.bind(this);
    this.getNameFromContract.bind(this);
    this.getDecimalsFromContract.bind(this);
  }

  getTokenInfo() {
    return new Promise((resolve, reject) => {
      const symbolPromise = this.getSymbolFromContract();
      const namePromise = this.getNameFromContract();
      const decimalPromise = this.getDecimalsFromContract();
      Promise.all([symbolPromise, namePromise, decimalPromise])
        .then(()=>{
          resolve({
            symbol: this.symbol,
            name: this.name,
            decimals: this.decimals,
          });
        })
        .catch((e) => {
          reject(e);
        })
    });
  }

  async getBalance(address) {
    console.log('getBalanceaddress: ', address);
    const balance = await this.getERCTokenBalance(address);
    this.balances[address] = balance;
    return balance;
  }

  async getERCTokenBalance(address){
    //fixme: For hackathon I have used this as string.
    return ''+await this.contract.methods.balanceOf(address).call();
  }
  async getSymbolFromContract(){
    let symbol = await this.contract.methods.symbol().call();
    if (!symbol) {
      symbol = 'Failed to fetch symbol'
    }
    this.symbol = symbol;
  }
  async getNameFromContract() {
    let name = await this.contract.methods.name().call();
    if (!name) {
      name = 'Failed to fetch name'
    }
    this.name = name
  }
  async getDecimalsFromContract() {
    let decimals = await this.contract.methods.decimals().call();
    if (!decimals) {
      decimals = 'Failed to fetch decimals'
    }
    this.decimals = decimals;
  }

  loadInfoFromLocalStorage(){
    // This will load from local storage.
    // If its not present in local storage, get it from contract.
    this.getTokenInfo();

  }
  saveTokenInfo(){
    // This will call local storage.
  }
  saveBalance(address) {
    // This will call local storage.
  }
  static from(address, web3) {
    if (!Web3Utils.isAddress(address)) {
      throw new Error(`Unknown token address: ${address}`);
    }
    if (!web3) {
      throw new Error('Web3 is undefined');
    }
    return new ERCToken(address,web3);
  }
}
