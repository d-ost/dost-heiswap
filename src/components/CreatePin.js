import React from 'react';
import * as web3Utils from 'web3-utils';

export default class CreatePin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin:'',
      confirmPin:'',
      shown: false
    };
    this.setPin = this.setPin.bind(this);
    this.confirmPin = this.confirmPin.bind(this);
    this.storePin = this.storePin.bind(this);
  }

  toggle(state) {
		this.setState({
			shown: state
		});
	}

  storePin() {
    console.log('in store pin');
    if(this.validatePin()) {
      return;
    }
    let pinHash = this.getPinHash();
    localStorage.setItem('pin', pinHash);
    this.props.changeView('saving');
  }

  validatePin() {
    if(this.state.pin.toString().length !== 6 || this.state.confirmPin.toString().length !== 6){
      this.toggle(true);
      return true;
    }

    if(this.state.pin !== this.state.confirmPin) {
      this.toggle(true);
      return true;
    }
    return false;
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

  confirmPin(event) {
    this.setState({
      confirmPin: event.target.value
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
        <div class="col-sm-3">
        <label> Enter Pin </label>
        </div>
        <div class="col-sm-3">
          <input type="password" name="pin" onChange={this.setPin} size="6"/>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
        <label> Confirm Pin </label>
        </div>
        <div class="col-sm-3">
          <input type="password" name="pin" onChange={this.confirmPin} required size="6"/>
        </div>
      </div>
      <div style={ shown }> Wrong Pin !!! </div>
      <div style={ hidden }> </div>
        <input type="submit" onClick={this.storePin} />
      </div>
    );
  }
}
