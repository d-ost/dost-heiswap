import Web3 from 'web3';
import React, { Component } from 'react';
import logo from './logo.svg';
import EthereumAccount from './components/EthereumAccount'
import { Modal, Card, Button } from 'rimble-ui';
import './App.css';
import Account from "./KeyManager/Account";
import ERCToken from "./KeyManager/ERCToken";
import TokenBalance from "./components/TokenBalance";
import Send from "./components/Send";

import {
  originTokens,
  auxiliaryTokens,
  originWeb3,
  auxiliaryWeb3
} from './Config';
import BaseToken from "./KeyManager/BaseToken";
import BurnerAction from "./components/BurnerAction";
import Receive from "./components/Receive";

let interval;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default',
      isOpen: false
    };
    // TODO: This is temp, will change in next commit
    this.account = null;

    this.originTokens = originTokens.map((tokenAddress) => {
      const token = ERCToken.from(tokenAddress, originWeb3);
      token.getTokenInfo();
      return token;
    });

    this.auxiliaryTokens = auxiliaryTokens.map((tokenAddress) => {
      const token = ERCToken.from(tokenAddress, auxiliaryWeb3);
      token.getTokenInfo();
      return token;
    });

    this.originBaseToken = BaseToken.from(originWeb3);
    this.auxiliaryBaseToken = BaseToken.from(auxiliaryWeb3);

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);

    interval = setInterval(this.poll.bind(this),7000)
  }

  fetchBalances(address) {
    this.originTokens.forEach((token) => {
      token.getBalance(address);
    });
    this.auxiliaryTokens.forEach((token)=> {
      token.getBalance(address);
    });
  }
  poll() {
    this.fetchBalances(this.account.address);
    // Update the view
    this.setState({});
  }
  componentDidMount(){
    console.log('componentDidMount');
    this.loadAccounts();
    this.setState({view: 'main'});
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    //fixme: This is very unefficient.
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(interval);
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  updateDimensions() {
    console.log('updateDimensions');
    //force it to rerender when the window is resized to make sure qr fits etc
    this.forceUpdate();
  }

  changeView(view) {
    console.log('Change view called: ', view);
    this.setState({view: view});
  }
  render() {
    console.log('Render is called');
    console.log('this.state: ', this.state);

    switch (this.state.view) {
      case 'main':
        return this.mainView();
      case 'saving':
        return this.savingView();
      case 'send':
        return this.sendView();
      case 'receive':
        return this.receiveView();
      default:
        return this.defaultView();
    }
  }

  // Other functions
  // TODO: This is temp, will change in next commit
  loadAccounts() {
    // Get the default address.
    const account = Account.getAccounts();
    this.account = account;
  }

  // View related functions
  defaultView() {
    return (
      <div className="App">
        This is a default view.
      </div>
    )
  }

  mainView() {
    const accountView = [];
    console.log('this.auxiliaryTokens: ', this.auxiliaryTokens);
    this.auxiliaryTokens.forEach((token)=> {
      console.log('token', token);
      accountView.push(
        <div className="Card">
          <TokenBalance
            token={token}
            account={this.account}
          />
        </div>
      )
    });
    accountView.push(
      <div className="Card">
        <TokenBalance
          token={this.auxiliaryBaseToken}
          account={this.account}
        />
      </div>
    )
    return (
      <div className="App">
        {accountView}
        <BurnerAction
          changeView={this.changeView.bind(this)}
          openModal={this.openModal.bind(this)}
        />
      </div>
    )
  }

  savingView() {
    return (
      <div className="App">
          This is a saving view.
      </div>
    )
  }
  sendView() {
    return (
      <React.Fragment>
        <Modal isOpen={this.state.isOpen}>
          <Send
            tokens={this.auxiliaryTokens}
            baseToken={this.auxiliaryBaseToken}
            account={this.account}
            closeModel={this.closeModal}
          />
        </Modal>
      </React.Fragment>
    );
  }
  receiveView() {
    return (
      <React.Fragment>
        <Modal isOpen={this.state.isOpen}>
          <Receive
            account={this.account}
            closeModel={this.closeModal}
          />
        </Modal>
      </React.Fragment>
    );
  }



  closeModal(e) {
    //e.preventDefault();
    this.setState((state, props) => ({
      isOpen: false,
      view: 'main'
    }));
  }

  openModal(e) {
    //e.preventDefault();
    this.setState((state, props) => ({
      isOpen: true
    }));
  }

}
