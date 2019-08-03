import React from 'react';
import * as web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.css';
import HEISWAPABI from '../contracts/Heiswap.abi';
import { serialize, h1, bn128 } from '../utils/AltBn128'


export default class Savings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {amount:''};
    this.setAmountToBeTransferred = this.setAmountToBeTransferred.bind(this);
    this.withdraw = this.withdraw.bind(this);
    localStorage.setItem('keyStores',''); // TODO: remove this as it is only for testing purpose
  }

  async withdraw() {
    // mixer contract address on 1405.
    let mixerContractAddress = '0x6f3024f722a9f5680fd0ada93f0cb61853eced36';

    // const heiSwapContract = new this.props.web3.eth.Contract(HEISWAPABI, mixerContractAddress);

    // let amountToBeTransferred = this.state.amount;
    let targetEthAmount = this.state.amount;

    let targetEthAddress = localStorage.getItem('burnerKey');
    // Generate a burner secret key
    // and create a pseudo stealth address
    const randomSk = crypto.randomBytes(32).toString('hex');
    const stealthSk = h1(
      serialize([randomSk, targetEthAddress])
    );

    let heiswapInstance = new this.props.web3.eth.Contract(HEISWAPABI, mixerContractAddress);

    const estRingIdx = await heiswapInstance
      .methods
      .getCurrentRingIdx(targetEthAmount)
      .call();

    const heiTokenEst = `hei-${targetEthAmount}-${estRingIdx}-${randomSk}`;

    console.log('heiTokenEst :- ',heiTokenEst);

    // Append "0x" in front of it, web3 requires it
    const stealthPk = bn128.ecMulG(stealthSk).map(x => '0x' + x.toString(16));

    // let decryptedKey = this.getPrivateKey('123456');
    let privateKey = '935a38d823dde34f5bbf75ab0f33110cdfe8d68b376e0efa03b36e060833f480';
    // let burnerAddress = localStorage.getItem('bunerKey');
    const depositTransaction = await heiswapInstance.methods.deposit(stealthPk).send({
            from: privateKey,
            value: web3.utils.toWei(targetEthAmount),
            gasLimit: '800000',
            // gasPrice
    } );

    // console.log('heiswap deposit transaction :- ',depositTransaction);

  }

  getPrivateKey(pin) {
    //decrypt the keystore using 6-digit pin
    let keyStore = localStorage.getItem('keyStore');
    // may be toString not required
    let decryptedKey = this.props.web3.eth.accounts.decrypt(keyStore.toString(), pin);
    return decryptedKey;

  }

  mixingAmount(amount) {
    this.amountMixing = ['32','16','8','4','3','2','1'];
    // mix the amounts.
    // get the keystore file and decrypt it using 6-digit pin.
    // make the transaction with mixed amount using private keys.
    let mixedAmount = [];
    let amountToBeMixed = this.state.amount;

    let index = 0;
    let denomination;
    while(amountToBeMixed != 0) {
      denomination = this.amountMixing[index];
      if( amountToBeMixed > denomination  ) {

      }
      else {
        mixedAmount[index] = amountToBeMixed / denomination;
        amountToBeMixed = amountToBeMixed / denomination;
      }
    }
  }

  setAmountToBeTransferred(event) {
    console.log('event.target.value :- ',event.target.value);
    this.setState({
      amount:event.target.value
    });
    console.log('after setting value :- ',this.state.amount);
  }

  async getBalance() {
    let balance = await this.props.web3.eth.getBalance(this.props.account);
    this.props.setState({
      balance: balance
    });
    return balance;
  }

  render(){
    return (
      <div class='container'>
        <div class="row">
            <div class="col-sm-6">
            <span> Balance of  {this.props.account} : </span>
            </div>
            <div class="col-sm-6">
            {
              // TODO: call balance when integrated
              // this.getBalance()
            }
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
            <span> Beneficiary : </span>
            </div>
            <div class="col-sm-6">
            {this.props.beneficiary}
            </div>
        </div>


        <div class="row">
            <div class="col-sm-6">
            <label> Amount : </label>
            </div>
            <div class="col-sm-6">
            <input type= 'text' class="form-control " value={this.state.amount} onChange={this.setAmountToBeTransferred} />
            </div>
        </div>


      <div class="row">
        <div class="col-sm-6">
          <button name="deposit" onClick={this.withdraw}> Deposit </button>
        </div>
      </div>

      </div>
    );
  }
}
