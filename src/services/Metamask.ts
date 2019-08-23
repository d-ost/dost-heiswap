import Web3 from "web3";

class Metamask {

  public isMetamaskSupported():boolean {
    let ethereum = (window as any).ethereum;
    let isMetamaskSupported = false;
    if (typeof ethereum !== 'undefined') {
      isMetamaskSupported = true;
      window.web3 = new Web3(ethereum);
    } else if (typeof window.web3 !== 'undefined') {
      isMetamaskSupported = true;
    }
    return isMetamaskSupported;
  }
  public async connect(): Promise<string> {
    return new Promise(((resolve, reject) => {
      let ethereum = (window as any).ethereum;
      if(ethereum) {
        window.web3 = new Web3(ethereum);
      }
      ethereum.enable()
        .then((accounts) => {
          resolve(accounts[0]);
        })
        .catch((e)=>{
          reject(e);
        });
    }));

  }
}

export default Metamask;
