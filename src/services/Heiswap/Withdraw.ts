// building on DepositPagje.js from Kendrick Tan, Heiswap, MIT
// github.com/kendricktan/heiswap-dapp


//todo [sarvesh] Revisit this logic
import {bn128, h1, serialize} from '../../utils/AltBn128.js';
import {append0x} from './Utils/Helper';
import Web3 from "web3";
import {Contract} from 'web3-eth-contract';
import {HeiswapToken} from "./Deposit";
import {TransactionReceipt} from 'web3-core';

const BN = require("bn.js");

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

// TODO: this is an async function
const withdraw = async (
  web3: Web3,
  heiswapInstance: Contract,
  heiswapToken: HeiswapToken,
  relayerAddress: string,
):Promise<TransactionReceipt> => {

  // TODO: assume ring has closed;
  // should this be an async function that just waits until
  // polling the ring reveals it s closed? or we retry to withdraw

  const ostAmount = heiswapToken.heiTargetOstAmount;
  const ringIndex = heiswapToken.heiRingIndexFinal;
  const randomSecretKey = heiswapToken.heiRandomSecretKey;

  // get the ringhash from the contract because it is calculated
  // with inclusion of all the participants private keys
  const ringHash = await heiswapInstance
    .methods
    .getRingHash(ostAmount, ringIndex)
    .call();

  // trim "0x" for generating the message-to-be-signed
  const ringHashBuf = Buffer.from(
    ringHash.slice(2), // Remove the '0x'
    'hex'
  );
  const targetAddressBuf = Buffer.from(
    heiswapToken.heiTargetAddress.slice(2), // Remove the '0x'
    'hex'
  );
  const messageBuf = Buffer.concat([
    ringHashBuf,
    targetAddressBuf
  ]);

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
      .getParticipants(ostAmount, ringIndex)
      .call();

    throw new Error(`Ring has not yet closed. Requires ${participantsRequired}. \n` +
      `${currentParticipants[0]} have deposited. \n` +
      `${currentParticipants[1]} have withdrawn.`); // always zero if ring open
  }

  // ring is closed

  // get public keys in the ring
  const publicKeys = await heiswapInstance
    .methods
    .getPublicKeys(ostAmount, ringIndex)
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
  const stealthSecretKey = h1(serialize([randomSecretKey, heiswapToken.heiTargetAddress]));
  const stealthPublicKey = bn128.ecMulG(stealthSecretKey);

  // assert stealth public/private key matches from the heiswapToken
  // if (stealthSecretKey !== heiswapToken.heiStealthSecretKey ||
  //   stealthPublicKey !== heiswapToken.heiStealthSecretKey) {
  //   console.error("Heiswap Token is invalid. Stealth key pair doesn't match.");
  //   console.log('heiswapToken', heiswapToken);
  //   console.log('stealthSecretKey', stealthSecretKey);
  //   // throw new Error();
  // }

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
  const signature = bn128.ringSign(
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

  const dataByteCode = heiswapInstance
    .methods
    .withdraw(
      heiswapToken.heiTargetAddress,
      ostAmount,
      ringIndex,
      c0,
      keyImage,
      s
    ).encodeABI();

  // try broadcasting metatransaction from our relayerAddress
  // note that this undercuts the privacy of the burner wallets
  // because they all get connected by the same relayer
  // for the hackathon purposes this is a nice solution though as
  // there is no relayer required, and the faucet will in the background
  // keep funding the relayer keys whenever required.
  try {
    const gas = await web3.eth.estimateGas({
      to: heiswapInstance.address,
      data: dataByteCode
    });

    const tx = {
      from: relayerAddress,
      to: heiswapInstance.address,
      gas,
      data: dataByteCode,
      nonce: await web3.eth.getTransactionCount(relayerAddress)
    };

    const txReceipt = await web3.eth.sendTransaction(tx);
    console.log('withdrawl txReceipt', txReceipt);
    return txReceipt;

    } catch (exc) {
      const excStr = exc.toString()
      console.error('excStr', excStr);

      if (excStr.indexOf('Signature has been used!') !== 0) {
        throw new Error('Signature has been used.');
      } else if (excStr.indexOf('Invalid signature') !== 0) {
        throw new Error('Invalid signature');
      } else if (excStr.indexOf('Pool isn\'t closed') !== 0) {
        throw new Error('Pool isn\'t closed');
      } else if (excStr.indexOf('All ETH from current pool') !== 0) {
        throw new Error('All ETH from current pool');
      } else {
        throw new Error('Unknown error on withdrawing from ring.');
      }
    }
}

export default withdraw;
