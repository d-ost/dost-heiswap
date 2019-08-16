import {bool} from "prop-types";

class Metamask {

  public isMetamaskSupported():boolean {
    let ethereum = (window as any).ethereum;
    let isMetamaskSupported = false;
    if (typeof ethereum !== 'undefined') {
      isMetamaskSupported = true;
    } else if (typeof window.web3 !== 'undefined') {
      isMetamaskSupported = true;
    }
    return isMetamaskSupported;
  }
  public async connect(): Promise<string> {
    return new Promise(((resolve, reject) => {
      let ethereum = (window as any).ethereum;
      ethereum.enable()
        .then((accounts) => {
          console.log('accounts: ', accounts);
          resolve(accounts[0]);
        })
        .catch((e)=>{
          reject(e);
        });
    }));

  }
}

export default Metamask;
