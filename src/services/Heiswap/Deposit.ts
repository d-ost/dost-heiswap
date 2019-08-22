import crypto from 'crypto'
import Web3 from "web3";
import {Contract} from 'web3-eth-contract';

import AltBn128 from '../../utils/AltBn128';

export interface HeiswapToken {
  heiTargetAmount: string;
  heiTargetAddress: string;
  heiRingIndexEst: string;
  heiStealthSecretKey: string;
  heiStealthPublicKey: Array<string>;
  heiRandomSecretKey: string;
  txHash?: string;
  heiRingIndexFinal?: string;
}

const deposit = async (
  web3: Web3,
  heiswapInstance: Contract,
  fromAddress: string,
  targetAmount: string,
  targetAddress: string,
): Promise<HeiswapToken> => {

  // generate random secret key
  const randomSecretKey = crypto.randomBytes(32).toString('hex');
  // calculate pseudo stealth address
  const stealthSecretKey = AltBn128.h1(
    AltBn128.serialize([randomSecretKey, targetAddress])
  );

  // ring might close before our transaction
  // is included, then we are in a later ring
  const currentRingIndex = await heiswapInstance
    .methods
    .getCurrentRingIdx(targetAmount)
    .call();

  // Append "0x" in front of it, web3 requires it
  const stealthPublicKey = AltBn128.ecMulG(stealthSecretKey).map(x => '0x' + x.toString(16));

  let heiswapToken: HeiswapToken = {
    heiTargetAmount: targetAmount,
    heiTargetAddress: targetAddress,
    heiRingIndexFinal: undefined,
    heiRingIndexEst: currentRingIndex,
    heiStealthSecretKey: stealthSecretKey,
    heiStealthPublicKey: stealthPublicKey,
    heiRandomSecretKey: randomSecretKey,
    txHash: undefined,
  };

  try {

    const rawTransaction = heiswapInstance
      .methods
      .deposit(stealthPublicKey);

    const txOptions = {
      from: fromAddress,
      gasPrice: '0x3B9ACA00',
      to: heiswapInstance.address,
      value: web3.utils.toWei(targetAmount, 'ether'),
      gasLimit: '200000',
      nonce: await web3.eth.getTransactionCount(fromAddress),
    };

    rawTransaction.gas = await rawTransaction.estimateGas(txOptions);

    const txReceipt = await rawTransaction.send(txOptions);
    console.log('Deposit Receipt', txReceipt);

    // get event return value
    const depositEventRetVal = txReceipt.events!.Deposited.returnValues;

    // get the actual ring index
    heiswapToken.heiRingIndexFinal = depositEventRetVal.idx;
    heiswapToken.txHash = txReceipt.transactionHash;
  } catch (error) {
    console.log('error: ', error);
    throw new Error('Failed to deposit in ring');
  }

  return heiswapToken;
};

export default deposit;

