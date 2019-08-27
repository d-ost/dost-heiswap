import Metamask from "../services/Metamask";
import Web3 from "web3";
import BigNumber from "bignumber.js";

export enum WalletType {
  None='None',
  Metamask='Metamask',
  Custom='Custom',
  WalletConnect='WalletConnect',
}

export class NetworkConfig {
  public networkType?: string;
  public heiswapAddress?: string;
  public relayerUrl?: string;
  public web3?: Web3;
  public gasPrice?: BigNumber;

  constructor(
    networkType?: string,
    heiswapAddress?: string,
    relayerUrl?: string,
    web3?: Web3,
    gasPrice?: BigNumber
  ) {
    this.networkType = networkType;
    this.heiswapAddress = heiswapAddress;
    this.relayerUrl = relayerUrl;
    this.web3 = web3;
    this.gasPrice = gasPrice;
  }
}

export class Network {
  public metamask: Metamask;
  public networkConfig: NetworkConfig;

  constructor(networkConfig: NetworkConfig) {
    this.metamask = new Metamask();
    this.networkConfig = networkConfig;
  }

  public static subscribeAccountsChanged(account: string) {
    console.log('new account :- ',account);
  }
}

export default new Network(new NetworkConfig());
