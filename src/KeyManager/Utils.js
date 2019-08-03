const Web3Utils = require('web3-utils');

export default class Utils {

  static isValidAddress(address){
    return Web3Utils.isAddress(address);
  }

  static getImagePathForSymbol(symbol) {
    console.log('symbol------>: ', symbol);
    if (symbol) {
      symbol = symbol.toLowerCase();
      if (symbol === 'st' || symbol === 'ost'){
        return 'ost.jpg'
      }
      if (symbol === 'weth'){
        return 'ethereum.png'
      }
    }
    return 'ost.jpg'
  }
}
