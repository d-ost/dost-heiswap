import localStorage from "../services/LocalStorage";
import Web3 from "web3";
import Web3Utils from 'web3-utils';

const BN = require("bn.js");

export default class BaseToken {
  web3: Web3;
  symbol: string;
  balances: Record<string, string>;
  totalBalances: Record<string, string>;

  constructor(symbol: string, web3: Web3) {
    this.web3 = web3;
    this.symbol = symbol;
    // This will store the balances for each address
    this.balances = {};
    this.totalBalances = {};

    // Bind the functions.
    this.getBalance.bind(this);
  }

  async getBalances(addresses, context) {
    const allBalanceRequest = addresses.map((address) =>
      this.getBalance(address)
    );
    let totalBalance = new BN(0);
    Promise.all(allBalanceRequest).then((result) => {
      totalBalance.add(new BN(result));
      this.totalBalances[context] = totalBalance.toString(10);
    });
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.web3.eth.getBalance(address);
    this.balances[address] = balance;
    return balance;
  }

  static from(symbol, web3) {
    if (!web3) {
      throw new Error('Web3 is undefined');
    }
    return new BaseToken(symbol, web3);
  }

  getFromAddress(amount, context) {
    const addresses = localStorage.getBurnerAddresses();
    // TODO: write the address selection logic here
    return addresses[0]
  };

  async send(to, amount, context) {
    const fromAddress = this.getFromAddress(amount, context);

    if (!Web3Utils.isAddress(to)) {
      throw new Error('Invalid to address');
    }

    // TODO: remove the hardcoded values.
    let gasLimit = 60000;

    const tx = {
      "from": fromAddress,
      "to": to,
      "value": amount,
      "gas": gasLimit,
      "gasPrice": Math.round(5 * 1010101010) // fixme
    };

    const privateKey = localStorage.getPrivateKeyForBurnerAddress(fromAddress);
    return new Promise((resolve, reject) => {
      let transactionHash;
      let result;
      this.web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
        if (signed)
          this.web3.eth.sendSignedTransaction(signed.rawTransaction!)
            .on('transactionHash', (hash) => {
              transactionHash = hash;
              console.log('transactionHash: ', transactionHash);
              localStorage.storeBurnerTransaction(transactionHash, true);
            })
            .on('receipt', (receipt) => {
              // TODO: check the status from the receipt
              result = true;
            }).on('error', (error) => {
            result = true;
          });
      });
      resolve(
        {
          transactionHash,
          result,
        }
      );
    });
  }

}
