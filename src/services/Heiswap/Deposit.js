import { serialize, h1, bn128 } from './Utils/AltBn128.js';

// building on DepositPagje.js from Kendrick Tan, Heiswap, MIT
// github.com/kendricktan/heiswap-dapp

// export const depositFromBucketsToNewBurner = (
//   HeiswapInstance,
//   Amount,
//   Buckets,
//   Burner,
//   ) => {

// }


// TargetOstAmount - must be exact the required amount
//   for an available ring.
export const deposit = (
  Web3,
  HeiswapInstance,
  FromAddress, 
  TargetOstAmount,
  TargetAddress,
) => {

  if (TargetOstAmount != 2) {
    throw new Error('For hackathon keep required single constant amount.');
  }

  // generate random secret key
  const randomSecretKey = crypto.randomBytes(32).toString('hex');
  // calculate pseudo stealth address
  const stealthSecretKey = h1(serialize(
    [randomSecretKey, TargetAddress]));

  // ring might close before our transaction
  // is included, then we are in a later ring
  const currentRingIndex = await HeiswapInstance
    .methods
    .getCurrentRingIdx(TargetOstAmount)
    .call();

  // Append "0x" in front of it, web3 requires it
  const stealthPublicKey = bn128.ecMulG(stealthSecretKey).map(x => '0x' + x.toString(16));

  let heiswapToken = {
    heiTargetOstAmount: TargetOstAmount,
    heiRingIndexFinal: null,
    heiRingIndexEst: currentRingIndex,
    heiStealthSecretKey: stealthSecretKey,
    heiStealthPublicKey: stealthPublicKey,
    txHash: null,
  };

  try {
    const gasPrice = await Web3.eth.getGasPrice();

    const depositResult = await HeiswapInstance
      .methods
      .deposit(stealthPublicKey)
      .send(
        {
          from: FromAddress,
          value: Web3.utils.toWei(TargetOstAmount.toString(10), 'ether'),
          gasLimit: '800000',
          gasPrice
        }
      );
    
    // get event return value
    const depositEventRetVal = depositResult.events.Deposited.returnValuues;

    // get the actual ring index
    const realRingIndex = depositEventRetVal.idx;

    heiswapToken.heiRingIndexFinal = realRingIndex;
    heiswapToken.txHash = depositResult.transactionHash;
  } catch (error) {
    throw new error('Failed to deposit in ring');
  }

  return heiswapToken;
}