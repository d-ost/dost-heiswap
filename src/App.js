import Web3 from 'web3';
import React, { Component } from 'react';
import logo from './logo.svg';
import EthereumAccount from './components/EthereumAccount'
import Savings from './components/Savings'
import {Modal, Card, Button, Flex, Box} from 'rimble-ui';
import './App.css';
import Account from "./KeyManager/Account";
import ERCToken from "./KeyManager/ERCToken";
import TokenBalance from "./components/TokenBalance";
import Send from "./components/Send";
import CreatePin from "./components/CreatePin";
import VerifyPin from "./components/VerifyPin";
import ScanQR from "./components/ScanQR";
import Transactions from "./components/Transactions";
import Advanced from './components/Advanced'

import {
  originTokens,
  auxiliaryTokens,
  originWeb3,
  auxiliaryWeb3
} from './Config';
import BaseToken from "./KeyManager/BaseToken";
import BurnerAction from "./components/BurnerAction";
import Receive from "./components/Receive";
import AdvancedAction from "./components/AdvancedAction";

let interval;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.previousView = 'main';
    this.currentView = 'main';
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

    this.originBaseToken = BaseToken.from('ETH',originWeb3);
    this.auxiliaryBaseToken = BaseToken.from('OST', auxiliaryWeb3);

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);

    interval = setInterval(this.poll.bind(this), 7000);
  }

  fetchBalances(address) {
    this.originTokens.forEach((token) => {
      token.getBalance(address);
    });
    this.originBaseToken.getBalance(address);

    this.auxiliaryTokens.forEach((token)=> {
      token.getBalance(address);
    });
    this.auxiliaryBaseToken.getBalance(address);
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
    this.previousView = this.currentView;
    this.currentView = view;
    this.setState({view: view});
  }
  goBack(){
    this.changeView(this.previousView);
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
      case 'pin':
        let pin = localStorage.getItem('pin');
        if(pin && pin.length > 0) {
          return this.verifyPin();
        }
        else {
          return this.createPin();
        }
      case 'scanQR':
        return this.scanQRView();
      case 'advance':
        return this.advanceView();
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
        <TokenBalance
          token={token}
          account={this.account}
        />
      )
    });
    accountView.push(
      <TokenBalance
        token={this.auxiliaryBaseToken}
        account={this.account}
      />
    )
    return (
      <div className="App">
        <div className="Card">
          <Flex>
            <Box width={1}>
              {accountView}
            </Box>
          </Flex>
          <Flex>
            <Box width={1} mt={2} mb={2}>
              <Transactions

              />
            </Box>
          </Flex>
          <Flex>
            <Box width={1}>
              <AdvancedAction
                changeView={this.changeView.bind(this)}
                openModal={this.openModal.bind(this)}
              />
            </Box>
          </Flex>
          <Flex>
            <Box width={1}>
              <BurnerAction
                changeView={this.changeView.bind(this)}
                openModal={this.openModal.bind(this)}
              />
            </Box>
          </Flex>
        </div>
      </div>
    )
  }

  savingView() {
    return (
      <div className="App">
          This is a saving view.
    {
      //This is temporary fixed values
    }
      <Savings
        beneficiary='123'
        account='346'
        changeView={this.changeView.bind(this)}
        openModal={this.openModal.bind(this)}
        closeModel={this.closeModal}
      />
      </div>
    )
  }

  createPin() {
    return (
      <div className="App">
      <CreatePin
        changeView={this.changeView.bind(this)}
        openModal={this.openModal.bind(this)}
      />
      </div>
    )
  }

  verifyPin() {
    return (
      <div className="App">
    {
      //This is temporary fixed values
    }
      <VerifyPin
        changeView={this.changeView.bind(this)}
        openModal={this.openModal.bind(this)}
      />
      </div>
    )
  }

  sendView() {
    return (
      <React.Fragment>
        <Modal isOpen={this.state.isOpen}>
          <Send
            changeView={this.changeView.bind(this)}
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

  scanQRView() {
    return (
      <React.Fragment>
        <Modal isOpen={this.state.isOpen}>
          <ScanQR
            changeView={this.changeView.bind(this)}
            closeModel={this.closeModal}
            goBack={this.goBack.bind(this)}

          />
        </Modal>
      </React.Fragment>
    );
  }

  advanceView() {
    return (
      <div className="App">
        <Advanced
          goBack={this.goBack.bind(this)}
        />
      </div>
    )
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
