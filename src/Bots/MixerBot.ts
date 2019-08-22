import Web3 from "web3";
import {Contract} from 'web3-eth-contract';

import HeiswapAbi from '../contracts/Heiswap.abi';

import Deposit from '../services/Heiswap/Deposit';
import Withdraw from '../services/Heiswap/Withdraw';
import {Account} from '../KeyManager/Account';
import config from "../config/Config";

export type WithDrawResponce = {success: boolean; error?: string; result?: any};
const AMOUNT = '1';

let signerAccount;
let beneficiaryAccount;
let heiswapToken;

class MixerBot {

  originWeb3: Web3;
  auxiliaryWeb3: Web3;
  heiSwapContract: Contract;

  constructor() {

    // this.originWeb3 = config.originWeb3();
    // this.auxiliaryWeb3 = config.auxiliaryWeb3();
    // this.heiSwapContract = new this.originWeb3.eth.Contract(HeiswapAbi as any, config.auxiliaryChain.heiswapAddress);

    this.originWeb3 = new Web3(config.originChain.RPCURL);
    this.originWeb3.transactionConfirmationBlocks = 1;
    this.auxiliaryWeb3 = new Web3(config.auxiliaryChain.RPCURL);
    this.auxiliaryWeb3.transactionConfirmationBlocks = 1;
    this.heiSwapContract = new this.auxiliaryWeb3.eth.Contract(HeiswapAbi as any, config.auxiliaryChain.heiswapAddress);
  }

  async start(): Promise<any> {
    await this.setSignerAccount();
    await this.createBeneficiaryKey();
    await this.deposit();
    while (true) {
      const withDrawResponse: WithDrawResponce = await this.withdraw();
      if (withDrawResponse.success || !withDrawResponse.error!.includes('Ring has not yet closed.')) {
        return withDrawResponse;
      }
      console.log('Waiting !!!');
      await this.sleep(7000);
    }
  }

  async setSignerAccount(): Promise<void> {
    const signerPrivateKey = process.env['SIGNER_PRIVATE_KEY'];
    if (!signerPrivateKey) {
      throw Error('ENV var SIGNER_PRIVATE_KEY is not set');
    }
    signerAccount = Account.fromPrivateKey(signerPrivateKey);
    console.log('account: ', signerAccount.address);
    this.auxiliaryWeb3.eth.accounts.wallet.add(
      signerAccount
    );
  }

  async createBeneficiaryKey(): Promise<void> {
    beneficiaryAccount = await this.auxiliaryWeb3.eth.accounts.create();
    this.auxiliaryWeb3.eth.accounts.wallet.add(beneficiaryAccount);
  }

  deposit(): Promise<any> {
    console.log('signerAccountAddress', signerAccount.address);
    console.log('beneficiaryAddress', beneficiaryAccount.address);
    return Deposit(
      this.auxiliaryWeb3,
      this.heiSwapContract,
      signerAccount.address,
      AMOUNT,
      beneficiaryAccount.address
    )
      .then((result) => {
        console.log('deposit result: ', result);
        heiswapToken = result;
      })
      .catch((e) => {
        console.error("Exception while depositing: ", e);
      });
  }

  async withdraw(): Promise<WithDrawResponce> {

    // this can be any string
    // is just used by relayer to verify if was signed by beneficiaryAccount
    const message = `Get amount from Heiswap via Relayer (Destination: ${beneficiaryAccount.address})`;
    const signedMessage = await beneficiaryAccount.sign(message);

    return Withdraw(
      this.auxiliaryWeb3,
      this.heiSwapContract,
      heiswapToken,
      message,
      signedMessage,
    )
      .then((result) => {
        console.log('withdraw result: ', result);
        return Promise.resolve({success: false, result: result});
      })
      .catch((error) => {
        console.error("Exception while withdrawing: ", error);
        return Promise.resolve({success: false, error: error.message});
      });
  }

  sleep(interval) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve();
      }, interval);
    });
  };

}

const mixerBot = new MixerBot();
mixerBot.start();


