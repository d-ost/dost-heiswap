import React from 'react';
import * as web3Utils from 'web3-utils';

export default class VerifyPin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin:'',
      shown:''
    };
    this.setPin = this.setPin.bind(this);
    this.verifyPin = this.verifyPin.bind(this);
  }

  showMsg(state) {
		this.setState({
			shown: state
		});
	}

  verifyPin() {
    console.log('in verify pin');
    if(this.state.pin.toString().length !== 6){
      this.showMsg(true);
      return true;
    }
    let generatedPinHash = this.getPinHash();
    let localStoragePin =  localStorage.getItem('pin', generatedPinHash);
    if(localStoragePin === generatedPinHash) {
      console.log('pin matches');
      this.props.changeView('saving');
    }
  }

  getPinHash() {
    let noOfTimeToHash = 3;
    let pin = this.state.pin;

    for(let i = 0;i < noOfTimeToHash; i++){
      pin = web3Utils.keccak256(pin);
    }

    return pin;
  }

  setPin(event) {
    this.setState({
      pin: event.target.value
    });
  }

  render(){

    let shown = {
			display: this.state.shown ? "block" : "none"
		};

		let hidden = {
			display: this.state.shown ? "none" : "block"
		};


    return (
      <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1> Verify Pin </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
        <label> Enter Pin </label>
        </div>
        <div class="col-sm-3">
          <input type="password" name="pin" onChange={this.setPin} required size="6"/>
        </div>
      </div>
      <div style={ shown }> Wrong Pin !!! </div>
      <div style={ hidden }> </div>
        <input type="submit" onClick={this.verifyPin} />
      </div>
    );
  }
}
