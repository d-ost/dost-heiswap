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
          OST_ADDRESS: "",
          WETH_ADDRESS: "",
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

  function findConfig(hostname) {
    return configs.filter(({ DOMAINS }) => DOMAINS.includes(hostname));
  }

  export default function getConfig() {
    const hostname = window.location.hostname;

    const config = findConfig(hostname);
    if (config.length === 1) {
      return config[0];
    } else {
      throw new Error("Cannot find distinct config for this domain");
    }
  }
