# dost-heiswap
Your friendly, private burner wallet on Mosaic
(Goerli testnet; EthIndia2.0)

Digital cash in every day life. Spending ETH, DAI or OST for everyday actions -directly- would expose your private life on the blockchain. We can use ephemeral (burner) keys that we reuse minimally, but chain analysis would still reveal where the funds came from.
We use ring-signatures in the dOST.cash wallet to mix and obfuscate the funding of burner keys, which you can then you use as anonymous digital cash. (We proudly build on Heiswap.)

We make the experience intuitive by introducing a "spending" wallet page (with burner keys), and a "savings" page, where the secured (larger, and anonymous) funds reside. We exploit this, as moving over the ring-mixer takes some time, as does moving funds from Layer-1 (more secure), into Layer-2 (fast and cheap).

People can instantly receive their first crypto, as simple as opening dost.cash on their phone, generating their first wallet in the browser. They can then later setup a secure smart contract wallet (using OpenST) which is recoverable with 6digit-PIN and a single friend.

dOST.cash can manage funds natively on Layer-2 (and Layer1), allowing for fast and cheap (micro)transactions. By building on Mosaic as a layer-2 scaling solution, we can run EVM contracts at internet scale: 
  solve *UX* with smart contract-based fund recovery, and
  establish *privacy* with ring signatures (and later zkSTARKs)

Deepesh KN, Gulshan V, Ben B

## How to use

On your phone's web browser, go to https://dost.cash.

The first time you visit, an ephemeral key is generated and stored in the local storage.  You can instantly receive funds, through QR code or address (later through direct message).

You land on the spending page; you can `TopUp` your spending wallet, by connecting cold storage / contract wallets.  For this you need to enter a 6digit PIN; in the demo, the 6digit PIN "encrypts" the keys cold storage keys in local storage - which is a placeHolder for deploying a smart contract wallet with 6digit-PIN recovery (OpenST).

Once you have connected cold storage and see the balance under the savings page, now you can `withdraw` to the spending page.

## What happens under the hood and why does it matter?

When you withdraw from your savings to your spending page;
every withdrawal is sent to a new burner key.

Much stronger, it is sent to a new burner key over an EVM mixing (AltBn128 elliptic curve cryptography) contract.  We integrated Heiswap on Layer-2 scaling solution to make privacy possible at scale.

Going over the mixing contract means that your cold storage cannot be connected to your burner actions.

We also started building a small bot that can generate background noise to further obfuscate the users.

## Contract addresses

```
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
```