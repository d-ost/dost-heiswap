export enum NetworkType {
  goerli = 'goerli',
  ropsten = 'ropsten',
  mainnet = 'main',
  private = 'private',
}

export default class Utils {

  static async getNetworkType(): Promise<string> {
     const networkType = await window.web3.eth.net.getNetworkType();
     console.log(`networkType: ${networkType}`);
     return networkType;
  }

  static async getEtherScanLink(txHash: string): Promise<string> {
    const networkType = await Utils.getNetworkType();
    let url;
    switch (networkType) {
      case NetworkType.ropsten:
        url = `https://ropsten.etherscan.io/tx/${txHash}`;
        break;
      case NetworkType.goerli:
        url = `https://goerli.etherscan.io/tx/${txHash}`;
        break;
      case NetworkType.mainnet:
        url = `https://etherscan.io/tx/${txHash}`;
        break;
      case NetworkType.mainnet:
        url = txHash;
        break;
      default:
        url = txHash;
    }

    return url;
  }
}