import Web3 from "web3";
import configData from './config.json';
interface Explorer {
  name: string;
  URL: string;
}

interface AuxiliaryChain {
  name: string;
  chainID: string;
  origin: string;
  RPCURL: string;
  anchorAddress: string;
  ostCogatewayAddress: string
  ostERC20Address: string;
  wethERC20Address: string;
  wethGatewayAddress: string;
  heiswapAddress: string;
  explorer: Explorer;
}

interface OriginChain {
  name: string;
  chainID: string;
  RPCURL: string;
  anchorAddress: string;
  ostGatewayAddress: string
  ostERC20Address: string;
  wethERC20Address: string;
  wethGatewayAddress: string;
  stakePoolAddress: string;
  explorer: Explorer;
}

interface Links {
  code: string;
  about: string;
}

class Config {
  domains: string[];
  links: Links;
  originChain: OriginChain ;
  auxiliaryChain: AuxiliaryChain;

  constructor(config: any) {
    this.domains = config.domains || [];
    this.links = config.links || {};
    this.originChain = config.originChain || {};
    this.auxiliaryChain = config.auxiliaryChain || {};
  }

  getTokenAddresses = (chain: "origin" | "auxiliary"): {
    ostAddress: string;
    wethAddress: string;
  } => {
    const chainDetails = chain === 'origin' ? this.originChain : this.auxiliaryChain;
    return {
      ostAddress: chainDetails.ostERC20Address,
      wethAddress: chainDetails.wethERC20Address
    };
  };

  getOriginTokenAddresses(): string {
    return this.getTokenAddresses('origin').ostAddress;
  }

  getAuxiliaryTokenAddresses() {
    return this.getTokenAddresses('auxiliary');
  }

  hostApplicable(hostname: string): boolean {
    return this.domains.includes(hostname);
  }

  originWeb3(): Web3 {
    return new Web3(this.originChain.RPCURL);
  }

  auxiliaryWeb3(): Web3 {
    return new Web3(this.auxiliaryChain.RPCURL);
  }

  static readConfig(configString: string): Config {
    if (configString && configString.length > 0) {
      const configObject = JSON.parse(configString);
      return new Config(configObject);
    }
    return new Config({});
  }
}

const config = Config.readConfig(JSON.stringify(configData));
export default config



