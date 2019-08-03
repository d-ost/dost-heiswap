const Web3Utils = require('web3-utils');

export default class Utils {

  static isValidAddress(address){
    return Web3Utils.isAddress(address);
  }

  static getImagePathForSymbol(symbol) {
    if (symbol === 'st'){
      return 'ost.jpg'
    }
    if (symbol === 'weth'){
      return 'ethereum.png'
    }
    return 'ost.jpg'
  }
}
