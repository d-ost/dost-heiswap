import Web3 from "web3";
import Metamask from "../services/Metamask";
import WalletConnect from "../services/WalletConnect";
import LocalStorage from "../services/LocalStorage";
import i18n from "../i18n";

export enum ReserveType {
  None='None',
  Metamask='Metamask',
  Dost='Dost',
  WalletConnect='WalletConnect',
}

export interface ReserveAccount {
  type: ReserveType;
  account?: string;
  title: string;
  description: string;
  supportedByBrowser: boolean;
  web3: Web3;
}

class SelectReserveModel {
  public metamaskAccount?: string;
  public metamask: Metamask;

  constructor(){
    this.metamask = new Metamask();

    const burnerAddresses = LocalStorage.getBucketAddresses();
    Object.keys(burnerAddresses).forEach((key)=>{
      const bucket = burnerAddresses[key];
      switch (bucket.type) {
        case ReserveType.Metamask:
          this.metamaskAccount = key;
          break;
        case ReserveType.Dost:
          break;
        case ReserveType.WalletConnect:
          break;
      }
    });
  }

  public getReserveAccountList(): ReserveAccount[]{

    // List the connect accounts on the top, followed by the connectable
    // options and unsupported options.
    let connectedOptions: ReserveAccount[] = [];
    let supportedOptions:ReserveAccount[] = [];
    let unSupportedOptions:ReserveAccount[] = [];

    // Check if the metamask is supported by the browser.
    const isMetamaskSupportedByBrowser = this.metamask.isMetamaskSupported();
    const metamaskReserveAccount = {
      type: ReserveType.Metamask,
      account: this.metamaskAccount,
      title: i18n.t('Metamask'),
      description: i18n.t('metamask_description'),
      supportedByBrowser: isMetamaskSupportedByBrowser,
      web3: window.web3,
    };
    if (this.metamask.isMetamaskSupported()) {
      if (this.metamaskAccount) {
        metamaskReserveAccount.description = i18n.t('metamask_connected_description');
        connectedOptions.push(metamaskReserveAccount);
      } else {
        supportedOptions.push(metamaskReserveAccount);
      }
    } else {
      unSupportedOptions.push(metamaskReserveAccount)
    }
    //
    // // Fixme: This is not yet integrated.
    // supportedOptions.push({
    //   type: ReserveType.Dost,
    //   account: undefined,
    //   title: i18n.t('dost'),
    //   description: i18n.t('dost_description'),
    //   supportedByBrowser: true,
    // });
    //
    // // Fixme: This is not yet integrated.
    // supportedOptions.push({
    //   type: ReserveType.WalletConnect,
    //   account: undefined,
    //   title: i18n.t('wallet_connect'),
    //   description: i18n.t('wallet_connect_description'),
    //   supportedByBrowser: true,
    // });

    return connectedOptions.concat(supportedOptions).concat(unSupportedOptions);
  }

  public async connectWithMetamask(): Promise<string> {
    const metamaskAddress =  await this.metamask.connect();
    if (metamaskAddress) {
      this.metamaskAccount = metamaskAddress;
      LocalStorage.storeBucketAddress(
        metamaskAddress,
        ReserveType.Metamask,
        undefined,
        undefined
      );
    }
    return metamaskAddress;
  }
  public disconnectMetamask() {
    LocalStorage.deleteBucketAddress(this.metamaskAccount!);
    this.metamaskAccount = undefined;
  }

  public async connectWithWalletConnect() {
    const walletConnect = new WalletConnect();
    const result = await walletConnect.connect();
    console.log('Result: ', result);
  }
}

export default new SelectReserveModel();

