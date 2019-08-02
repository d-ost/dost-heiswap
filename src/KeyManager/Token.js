import Web3 from 'web3';
const Web3Utils = require('web3-utils');
const abi = require('../abi/EIP20');

export default class Token {
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
    this.getBaseTokenBalance.bind(this);
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

  getBalance(address) {
    console.log('getBalanceaddress: ', address);
    return new Promise((resolve, reject) => {
      const baseTokenBalancePromise = this.getBaseTokenBalance(address);
      const erc20TokenBalancePromise = this.getERCTokenBalance(address);
      Promise.all([baseTokenBalancePromise, erc20TokenBalancePromise])
        .then((result)=>{
          const newBalance = {
            baseTokenBalance: result[0],
            erc20TokenBalance: result[1],
          };
          this.balances[address] = newBalance;
          resolve(newBalance);
        })
        .catch((e) => {
          reject(e);
        })
    });
  }

  async getBaseTokenBalance(address){
    return await this.web3.eth.getBalance(address);
  }
  async getERCTokenBalance(address){
    //fixme: For hackathon I have used this as string.
    return ''+await this.contract.methods.balanceOf(address).call();
  }
  async getSymbolFromContract(){
    this.symbol = await this.contract.methods.symbol().call();
  }
  async getNameFromContract() {
    this.name = await this.contract.methods.name().call();
  }
  async getDecimalsFromContract() {
    this.decimals = await this.contract.methods.decimals().call();
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
    return new Token(address,web3);
  }
}
