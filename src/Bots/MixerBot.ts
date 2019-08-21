import Web3 from "web3";
import {Contract} from 'web3-eth-contract';

import HeiswapAbi from '../contracts/Heiswap.abi';

import Deposit from '../services/Heiswap/Deposit';
import Withdraw from '../services/Heiswap/Withdraw';
import {Account} from '../KeyManager/Account';
import config,{Config} from "../config/Config";
import configData from '../config/config.json';

const OST_AMOUNT = '1';

const addresses = {};
const tokens = {};
let signerAccount;

let interval;

class MixerBot {

  originWeb3: Web3;
  auxiliaryWeb3: Web3;
  numberOfAddress: number;
  maxTimeInterval: number;
  heiSwapContract: Contract;

  constructor(numberOfAddress, maxTimeInterval) {
    this.numberOfAddress = numberOfAddress;
    this.maxTimeInterval = maxTimeInterval;
    console.log('class Config  ', Config);
    const configObject: Config= Config.readConfig(JSON.stringify(configData));
    console.log('config object ', configObject);
    console.log('config', config);
    console.log('config', config.domains);
    this.originWeb3 = config.originWeb3();
    this.auxiliaryWeb3 = config.auxiliaryWeb3();
    this.heiSwapContract = new this.originWeb3.eth.Contract(HeiswapAbi as any, config.auxiliaryChain.heiswapAddress);

    for (let i = 0; i < numberOfAddress; i++) {
      const account = Account.new();
      addresses[account.address] = account;
    }

    const signerPrivateKey = process.env['SIGNER_PRIVATE_KEY'];
    signerAccount = Account.fromPrivateKey(signerPrivateKey);
    console.log('account: ', signerAccount.address);
    this.originWeb3.eth.accounts.wallet.add(
      signerAccount
    );
  }

  start():void {
    interval = setInterval(this.perform.bind(this), 6000);
    // const mode = process.env["BOT_MODE"];
    // if (mode === 'deposit') {
    //   this.deposit();
    // } else if (mode === 'withdraw') {
    //   this.withdraw();
    // }
  }

  perform():void {
    const randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber == 0) {
      this.deposit();
    } else if (randomNumber == 1) {
      this.withdraw();
    }
  }

  deposit():void {
    console.log('trying to deposit');
    const address = Object.keys(addresses)[0];
    console.log('signerAccountAddress', signerAccount.address);
    console.log('targerAddress', address);
    Deposit(this.originWeb3, this.heiSwapContract, signerAccount.address, OST_AMOUNT, address)
      .then((result) => {
        console.log('deposit result: ', result);
        tokens[result.txHash!] = result;
      })
      .catch((e) => {
        console.log("Exception while depositing: ", e);
      });
  }

  withdraw():void {
    console.log('trying to withdraw');
    const address = Object.keys(addresses)[0];
    const tokenKeys = Object.keys(tokens);
    console.log('tokenKeys.length', tokenKeys.length);
    if (tokenKeys.length > 0) {
      const index = Math.floor(Math.random() * tokenKeys.length);
      const key = tokenKeys[index];
      const token = tokens[key];

      Withdraw(this.originWeb3, this.heiSwapContract, token)
        .then((result) => {
          console.log('withdraw result: ', result);
          delete tokens[key];
        })
        .catch((e) => {
          console.log("Exception while withdrawn: ", e);
        });
    }
  }
}


const mixerBot = new MixerBot(1, 1000);
mixerBot.start();


