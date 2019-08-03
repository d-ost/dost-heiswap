import Utils from './KeyManager/Utils';
import Web3 from "web3";

const configs = [
    {
      DOMAINS: ["localhost", "dost.cash"],
      LINKS: {
          CODE: "https://github.com/d-ost/dost-heiswap",
          ABOUT: "https://dost.cash",
      },
      AUX_CHAIN: {
          NAME: "Mosaic-1405",
          CHAINID: 1405,
          ORIGIN: "goerli",
          RPC: "https://mosaicdao.org/aux/1405",
          //WS: "ws://mosaicdao.org/aux/1405",
          ANCHOR_ADDRESS: "",
          OST_COGATEWAY_ADDRESS: "",
          OST_ADDRESS: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
          WETH_ADDRESS: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
          WETH_GATEWAY_ADDRESS: "",
          STAKING_POOL_ADDRESS: "",
          EXPLORER: {
              NAME: "",
              URL: "",
          }
      },
      ORIGIN_CHAIN: {
          NAME: "goerli",
          CHAINID: 5,
          RPC: "https://mosaicdao.org/origin/goerli",
          //WS: "ws://mosaicdao.org/origin/goerli",
          ANCHOR_ADDRESS: "",
          OST_GATEWAY_ADDRESS: "",
          OST_ADDRESS: "",
          WETH_ADDRESS: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
          WETH_GATEWAY_ADDRESS: "",
          REDEMPTION_POOL_ADDRESS: "",
          EXPLORER: {
              NAME: "Goerli Etherscan",
              URL: "https://goerli.etherscan.io/",
          }
      }
    }
  ];

  function getTokenAddresses(chain) {
    const addresses = [];
    if (Utils.isValidAddress(chain.OST_ADDRESS)) {
      addresses.push(chain.OST_ADDRESS)
    }
    if (Utils.isValidAddress(chain.WETH_ADDRESS)) {
      addresses.push(chain.WETH_ADDRESS)
    }
    return addresses;
  }

  function  getOriginTokenAddresses(config) {
    return getTokenAddresses(config.ORIGIN_CHAIN);
  }

  function  getAuxiliaryTokenAddresses(config) {
    return getTokenAddresses(config.AUX_CHAIN);
  }

  function findConfig(hostname) {
    return configs.filter(({ DOMAINS }) => DOMAINS.includes(hostname));
  }

  function getConfig() {
    const hostname = window.location.hostname;

    const config = findConfig(hostname);
    if (config.length === 1) {
      return config[0];
    } else {
      throw new Error("Cannot find distinct config for this domain");
    }
  }

  const config = getConfig();
  const originTokens = getOriginTokenAddresses(config);
  const auxiliaryTokens = getAuxiliaryTokenAddresses(config);
  const originWeb3 = new Web3(config.ORIGIN_CHAIN.RPC);
  const auxiliaryWeb3 = new Web3(config.AUX_CHAIN.RPC);
  export default config
  export {
    originTokens,
    auxiliaryTokens,
    originWeb3,
    auxiliaryWeb3
  };


