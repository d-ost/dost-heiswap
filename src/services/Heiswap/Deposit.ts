import {bn128, h1, serialize} from '../../utils/AltBn128.js';
import crypto from 'crypto'
import Web3 from "web3";
import {Contract} from 'web3-eth-contract';

export interface HeiswapToken {
  heiTargetOstAmount: string;
  heiTargetAddress: string;
  heiRingIndexFinal?: string;
  heiRingIndexEst: string;
  heiStealthSecretKey: string;
  heiStealthPublicKey: string;
  heiRandomSecretKey: string;
  txHash?: string;
}

//fixme [sarvesh] Revisit this logic
const deposit = async (
  web3: Web3,
  heiswapInstance: Contract,
  fromAddress: string,
  targetOstAmount: string,
  targetAddress: string,
): Promise<HeiswapToken> => {

  // generate random secret key
  const randomSecretKey = crypto.randomBytes(32).toString('hex');
  // calculate pseudo stealth address
  const stealthSecretKey = h1(serialize(
    [randomSecretKey, targetAddress]));

  // ring might close before our transaction
  // is included, then we are in a later ring
  const currentRingIndex = await heiswapInstance
    .methods
    .getCurrentRingIdx(targetOstAmount)
    .call();

  // Append "0x" in front of it, web3 requires it
  const stealthPublicKey = bn128.ecMulG(stealthSecretKey).map(x => '0x' + x.toString(16));

  let heiswapToken: HeiswapToken = {
    heiTargetOstAmount: targetOstAmount,
    heiTargetAddress: targetAddress,
    heiRingIndexFinal: undefined,
    heiRingIndexEst: currentRingIndex,
    heiStealthSecretKey: stealthSecretKey,
    heiStealthPublicKey: stealthPublicKey,
    heiRandomSecretKey: randomSecretKey,
    txHash: undefined,
  };

  try {
    const gasPrice = '0x3B9ACA00';

    const depositResult = await heiswapInstance
      .methods
      .deposit(stealthPublicKey)
      .send(
        {
          from: fromAddress,
          value: web3.utils.toWei(targetOstAmount, 'ether'),
          gasLimit: '800000', //todo gas limit
          gasPrice: gasPrice,
          nonce: await web3.eth.getTransactionCount(fromAddress)
        }
      );

    // get event return value
    const depositEventRetVal = depositResult.events.Deposited.returnValues;

    // get the actual ring index
    heiswapToken.heiRingIndexFinal = depositEventRetVal.idx;
    heiswapToken.txHash = depositResult.transactionHash;
  } catch (error) {
    console.log('error: ', error);
    throw new Error('Failed to deposit in ring');
  }

  return heiswapToken;
};

export default deposit;

