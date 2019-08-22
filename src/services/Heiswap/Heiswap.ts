import crypto from 'crypto'
import AltBn128 from '../../utils/AltBn128';
import HeiswapABI from '../../contracts/Heiswap.abi';
import Web3 from "web3";

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

class Heiswap {

  constructor() {

  }

  async deposit(
    web3: Web3,
    heiswapAddress,
    fromAddress: string,
    targetAmount: string,
    targetAddress: string,
  ): Promise<HeiswapToken> {

    // return new Promise<HeiswapToken>(async (resolve, reject) => {
    const heiswapInstance = new web3.eth.Contract(HeiswapABI as any, heiswapAddress);

    // generate random secret key
    const randomSecretKey = crypto.randomBytes(32).toString('hex');
    // calculate pseudo stealth address
    const stealthSecretKey = AltBn128.h1(AltBn128.serialize(
      [randomSecretKey, targetAddress]));

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

    const dataByteCode = heiswapInstance
      .methods
      .deposit(stealthPublicKey)
      .encodeABI();

    const gas = await web3.eth.estimateGas({
      to: heiswapInstance.address,
      data: dataByteCode
    });

    const tx = {
      to: heiswapAddress,
      from: fromAddress,
      value: targetAmount,//web3.utils.toWei(targetAmount, 'ether'),
      gasLimit: gas,
      gasPrice: '0x3B9ACA00',
      data: dataByteCode,
    };


    // todo temporary fix
    web3.transactionConfirmationBlocks = 1;
    const txReceipt = await web3.eth.sendTransaction(tx);
    heiswapToken.txHash = txReceipt.transactionHash;
    if (txReceipt.events) {
      const depositEventRetVal = txReceipt.events!.Deposited.returnValues;
      // get the actual ring index
      heiswapToken.heiRingIndexFinal = depositEventRetVal.idx;
    }
    return heiswapToken;

  }
}

export default new Heiswap();
