// building on DepositPagje.js from Kendrick Tan, Heiswap, MIT
// github.com/kendricktan/heiswap-dapp

import AltBn128 from '../../utils/AltBn128';

import Web3 from "web3";
import {Contract} from 'web3-eth-contract';
import axios from 'axios'

const BN = require("bn.js");

import {HeiswapToken} from "./Deposit";
import {append0x} from './Utils/Helper';

// BigNumber 0
const bnZero = new BN('0', 10);

// Possible states
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

const withdraw = async (
  web3: Web3,
  heiswapInstance: Contract,
  heiswapToken: HeiswapToken,
):Promise<{ errorMessage: string, txHash: string }> => {

  const targetAmount = heiswapToken.heiTargetAmount;
  const targetAddress = heiswapToken.heiTargetAddress;
  const ringIndex = heiswapToken.heiRingIndexFinal;
  const randomSecretKey = heiswapToken.heiRandomSecretKey;

  // get the ringhash from the contract because it is calculated
  // with inclusion of all the participants private keys
  const ringHash = await heiswapInstance
    .methods
    .getRingHash(targetAmount, ringIndex)
    .call();

  // check if ring has closed
  // if ring hasn't closed yet the return value is:
  // > abi.encodePacked("closeRing", receivedEther, index);
  if (ringHash.length !== 66) {
    const participantsRequired = await heiswapInstance
      .methods
      .getRingMaxParticipants()
      .call();

    const currentParticipants = await heiswapInstance
      .methods
      .getParticipants(targetAmount, ringIndex)
      .call();

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

  // Slice public keys into an array of Points [[BN,BN]]
  const publicKeysBN = publicKeys
    .map(x => {
      return [
        new BN(Buffer.from(x[0].slice(2), 'hex')),
        new BN(Buffer.from(x[1].slice(2), 'hex'))
      ]
    })
    .filter(x => x[0].cmp(bnZero) !== 0 && x[1].cmp(bnZero) !== 0);

  // Check if user is able to generate any one of these public keys
  const stealthSecretKey = AltBn128.h1(AltBn128.serialize([randomSecretKey, targetAddress]));
  const stealthPublicKey = AltBn128.ecMulG(stealthSecretKey);

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

  if (!canSign) {
    throw new Error("Heiswap Token refers to a ring for which it cannot sign.");
  }

  // sign the receiver address
  const signature = AltBn128.ringSign(
    messageBuf,
    publicKeysBN,
    stealthSecretKey,
    secretIndex
  );

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
    '',
  );

  const resp = await axios.post('http://127.0.0.1:3000/', {
    message,
    signedMessage,
    receiver: targetAddress,
    targetAmount,
    ringIndex,
    c0,
    keyImage,
    s
  });

  return resp.data;

};

export default withdraw;
