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
          ANCHOR_ADDRESS: "0x2Bbe4DFb364e76dA987Ac5754bB87b476cC6D80B",
          OST_COGATEWAY_ADDRESS: "0x5efaE177C9f37E6DA82e807530EA550AA5F0AFdd",
          // we don't need to deal with the ERC20 wrapped OST for Heiswap
          OST_ERC20_ADDRESS: "0x3b588816D166A7aac3A68B0769B0E0168A6797a3",
          WETH_ADDRESS: "0xBB5676d85d28DA039F982C07E4217fB0FDB2c2ef",
          WETH_GATEWAY_ADDRESS: "0x962e1404D6957d8fF56F8fE79a3fC2B670C3d578",
          HEISWAP: "0x6f3024f722a9f5680fd0ada93f0cb61853eced36",
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
          ANCHOR_ADDRESS: "0x4fDF26dc9a99D11FfB39a2d88a7E39E49544602a",
          OST_GATEWAY_ADDRESS: "0x6649c6FF3629aE875b91B6C1551139c9feaA2514",
          OST_ADDRESS: "0xd426b22f3960d01189a3d548b45a7202489ff4de",
          WETH_ADDRESS: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
          WETH_GATEWAY_ADDRESS: "0x6649c6FF3629aE875b91B6C1551139c9feaA2514",
          STAKING_POOL_ADDRESS: "0xeaa192d486ac5243886a28001e27a68cae5fde4b",
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


