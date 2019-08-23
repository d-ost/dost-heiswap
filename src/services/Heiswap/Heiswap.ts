import crypto from 'crypto'
import HeiswapABI from '../../contracts/Heiswap.abi';
import Web3 from "web3";
import axios from 'axios'
import {append0x} from './Utils/Helper';
import Utils from "../../utils/Utils";
import {
  bn128,
  powmod,
  h1,
  h2,
  serialize
} from '../../utils/AltBn128V2';
import abiDecoder from 'abi-decoder';

const BN = require("bn.js");

// BigNumber 0
const bnZero = new BN('0', 10);

export interface HeiswapToken {
  heiTargetAmount: string;
  heiTargetAddress: string;
  heiTargetPrivateKey: string;
  heiRingIndexEst: string;
  heiStealthSecretKey: string;
  heiStealthPublicKey: Array<string>;
  heiRandomSecretKey: string;
  txHash?: string;
  heiRingIndexFinal?: string;
}

const WITHDRAWALSTATES = {
  RelayerUnreachable: -3,
  UnknownError: -2,
  Nothing: -1,
  CorruptedToken: 0,
  RingNotClosed: 1,
  RingNotEnoughParticipantsToClose: 2,
  ForceClosingRing: 3,
  FailedCloseRing: 4,
  SuccessCloseRing: 5,
  InvalidRing: 6,
  InvalidSignature: 7,
  SignatureUsed: 8,
  Withdrawn: 9
};
class Heiswap {

  constructor() {
    abiDecoder.addABI(HeiswapABI);
  }

  async deposit(
    web3: Web3,
    heiswapAddress: string,
    fromAddress: string,
    targetAmount: string,
    targetAddress: string,
    targetPrivateKey: string
  ): Promise<HeiswapToken> {

    // return new Promise<HeiswapToken>(async (resolve, reject) => {
    const heiswapInstance = new web3.eth.Contract(HeiswapABI as any, heiswapAddress);

    // generate random secret key
    const randomSecretKey = crypto.randomBytes(32).toString('hex');
    // calculate pseudo stealth address
    const stealthSecretKey = h1(serialize(
      [randomSecretKey, targetAddress]));

    // ring might close before our transaction
    // is included, then we are in a later ring
    const currentRingIndex = await heiswapInstance
      .methods
      .getCurrentRingIdx(targetAmount)
      .call();

    // Append "0x" in front of it, web3 requires it
    const stealthPublicKey = bn128.ecMulG(stealthSecretKey).map(x => '0x' + x.toString(16));

    let heiswapToken: HeiswapToken = {
      heiTargetAmount: targetAmount,
      heiTargetAddress: targetAddress,
      heiRingIndexFinal: undefined,
      heiRingIndexEst: currentRingIndex,
      heiStealthSecretKey: stealthSecretKey,
      heiStealthPublicKey: stealthPublicKey,
      heiRandomSecretKey: randomSecretKey,
      txHash: undefined,
      heiTargetPrivateKey: targetPrivateKey,
    };

    const dataByteCode = heiswapInstance
      .methods
      .deposit(stealthPublicKey)
      .encodeABI();

    const tx = {
      to: heiswapAddress,
      from: fromAddress,
      value: targetAmount,//web3.utils.toWei(targetAmount, 'ether'),
      data: dataByteCode,
    };


    // todo temporary fix
    web3.transactionConfirmationBlocks = 1;
    const txReceipt = await web3.eth.sendTransaction(tx);
    console.log('txReceipt for heiswap  ', txReceipt);
    heiswapToken.txHash = txReceipt.transactionHash;
    let events = Utils.getFormattedEvents(abiDecoder.decodeLogs(txReceipt.logs));
    console.log('events  ', events);
    if (events) {
      const depositEventRetVal = events.Deposited;
      ;
      // get the actual ring index
      heiswapToken.heiRingIndexFinal = depositEventRetVal.idx;
    }
    return heiswapToken;

  }


  async withdraw(
    web3: Web3,
    heiswapAddress: string,
    heiswapToken: HeiswapToken
  ) {

    console.log('heiswapAddress  ', heiswapAddress);
    console.log('heiswapToken  ', heiswapToken);
    console.log('withdraw  called');
    const heiswapInstance = new web3.eth.Contract(HeiswapABI as any, heiswapAddress);
    console.log('done instance');
    const targetAmount = '1';
    const targetAddress = heiswapToken.heiTargetAddress;
    const ringIndex = heiswapToken.heiRingIndexFinal;
    const randomSecretKey = heiswapToken.heiRandomSecretKey;

    // get the ringhash from the contract because it is calculated
    // with inclusion of all the participants private keys
    const ringHash = await heiswapInstance
      .methods
      .getRingHash(targetAmount, ringIndex)
      .call();

    console.log('ring hashh ', ringHash);
    // check if ring has closed
    // if ring hasn't closed yet the return value is:
    // > abi.encodePacked("closeRing", receivedEther, index);
    if (ringHash.length !== 66) {
      const participantsRequired = await heiswapInstance
        .methods
        .getRingMaxParticipants()
        .call();
      console.log('participantsRequired  ', participantsRequired);
      const currentParticipants = await heiswapInstance
        .methods
        .getParticipants(targetAmount, ringIndex)
        .call();

      console.log('currentParticipants  ', currentParticipants);
      throw new Error(`Ring has not yet closed. Requires ${participantsRequired}. \n` +
        `${currentParticipants[0]} have deposited. \n` +
        `${currentParticipants[1]} have withdrawn.`); // always zero if ring open
    }

    // trim "0x" for generating the message-to-be-signed
    const ringHashBuf = Buffer.from(
      ringHash.slice(2), // Remove the '0x'
      'hex'
    );
    const targetAddressBuf = Buffer.from(
      targetAddress.slice(2), // Remove the '0x'
      'hex'
    );
    const messageBuf = Buffer.concat([
      ringHashBuf,
      targetAddressBuf
    ]);

    // get public keys in the ring
    const publicKeys = await heiswapInstance
      .methods
      .getPublicKeys(targetAmount, ringIndex)
      .call();

    console.log('public keyss ', publicKeys);
    // Slice public keys into an array of Points [[BN,BN]]
    const publicKeysBN = publicKeys
      .map(x => {
        return [
          new BN(Buffer.from(x[0].slice(2), 'hex')),
          new BN(Buffer.from(x[1].slice(2), 'hex'))
        ]
      })
      .filter(x => x[0].cmp(bnZero) !== 0 && x[1].cmp(bnZero) !== 0);

    console.log('publicKeysBN  ', publicKeysBN);
    // Check if user is able to generate any one of these public keys
    const stealthSecretKey = h1(serialize([randomSecretKey, targetAddress]));
    const stealthPublicKey = bn128.ecMulG(stealthSecretKey);

    // check that we are in this ring
    let secretIndex = 0;
    let canSign = false;
    for (let i = 0; i < publicKeysBN.length; i++) {
      const curPubKey = publicKeysBN[i];

      if (curPubKey[0].cmp(stealthPublicKey[0]) === 0 && curPubKey[1].cmp(stealthPublicKey[1]) === 0) {
        secretIndex = i;
        canSign = true;
        break;
      }
    }

    console.log('some cryptograohy');

    if (!canSign) {
      throw new Error("Heiswap Token refers to a ring for which it cannot sign.");
    }


    // sign the receiver address
    const signature = bn128.ringSign(
      messageBuf,
      publicKeysBN,
      stealthSecretKey,
      secretIndex
    );

    console.log(' signature   ', signature);

    // create the meta-transaction
    const c0 = append0x(signature[0].toString('hex'));
    const s = signature[1].map(x => append0x(x.toString('hex')));
    const keyImage = [
      append0x(signature[2][0].toString('hex')),
      append0x(signature[2][1].toString('hex'))
    ];

    const message = `Get amount from Heiswap via Relayer (Destination: ${targetAddress})`;

    const signedMessage = await web3.eth.accounts.sign(
      message,
      heiswapToken.heiTargetPrivateKey,
    );

    console.log("message  ", message);
    console.log("signedMessage  ", signedMessage);
    console.log("receiver  ", targetAddress);
    console.log("targetAmount  ", targetAmount);
    console.log("ringIndex  ", ringIndex);
    console.log("c0  ", c0);
    console.log("keyImage  ", keyImage);
    console.log("s  ", s);

    const resp = await axios.post('https://relayer.heiswap.exchange', {
      message,
      signedMessage,
      receiver: targetAddress,
      ethAmount:targetAmount,
      ringIdx:ringIndex,
      c0,
      keyImage,
      s
    });

    return resp.data;
  }
}




export default new Heiswap();
