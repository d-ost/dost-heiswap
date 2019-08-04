import Account from "../KeyManager/Account";

'strict mode'

import heiswapAbi from '../contracts/Heiswap.abi.js';
import config, {auxiliaryWeb3} from '../Config'
import depositOST from '../services/Heiswap/Deposit';
import withdrawOST from '../services/Heiswap/Withdraw';
import Web3 from "web3";

let web3;
const NUMBER_OF_PARTICIPANTS = 6;
const OST_AMOUNT = 1;

const addresses = {};
const tokens = {};
let signerAccount;

let interval;

class MixerBot {
  constructor(numberOfAddress, maxTimeInterval) {
    this.numberOfAddress = numberOfAddress;
    this.maxTimeInterval = maxTimeInterval;
    web3 = new Web3('ws://34.243.117.168:51405');

    this.heiSwapContract = new web3.eth.Contract(heiswapAbi,config.AUX_CHAIN.HEISWAP);

    for (let i=0; i<numberOfAddress; i++) {
      const account = Account.new();
      addresses[account.address] = account;
    }

    const signerPrivateKey = process.env['SIGNER_PRIVATE_KEY']; //0x935a38d823dde34f5bbf75ab0f33110cdfe8d68b376e0efa03b36e060833f480
    signerAccount = Account.fromPrivateKey(signerPrivateKey);
    console.log('account: ', signerAccount.address);
    web3.accounts.wallet.add(
      signerAccount
    );
  }

  start() {
    interval = setInterval(this.perform.bind(this),6000);
    // const mode = process.env["BOT_MODE"];
    // if (mode === 'deposit') {
    //   this.deposit();
    // } else if (mode === 'withdraw') {
    //   this.withdraw();
    // }
  }

  perform() {
    const randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber==0) {
      this.deposit();
    }
    else if (randomNumber==1) {
      this.withdraw();
    }
  }

  deposit() {
    console.log('trying to deposit');
    const address = Object.keys(addresses)[0];
    console.log('signerAccountAddress', signerAccount.address);
    console.log('targerAddress', address);
    depositOST(web3, this.heiSwapContract, signerAccount.address, OST_AMOUNT, address)
      .then((result) => {
        console.log('deposit result: ', result);
        tokens[result.txHash] = result;
      })
      .catch((e) => {
        console.log("Exception while depositing: ", e);
      });
  }

  withdraw() {
    console.log('trying to withdraw');
    const address = Object.keys(addresses)[0];
    const tokenKeys = Object.keys(tokens);
    console.log('tokenKeys.length', tokenKeys.length);
    if (tokenKeys.length>0) {
      const index = Math.floor(Math.random() * tokenKeys.length);
      const key = tokenKeys[index];
      const token = tokens[key];

      withdrawOST(web3, this.heiSwapContract, token, address)
        .then((result) => {
          console.log('withdraw result: ', result);
          delete tokens[key];
        })
        .catch((e)=> {
          console.log("Exception while withdrawn: ", e);
        });
    }
  }
}


const mixerBot = new MixerBot(1, 1000);
mixerBot.start();


