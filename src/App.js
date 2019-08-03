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
import Saving from "./components/Saving";

let interval;

const BURNER = 'BURNER';
const BUCKET = 'BUCKET';

export default class App extends Component {
  constructor(props) {
    super(props);

    // Fixme: This is a quick fix for hackathon, this is used while going back
    // from one screen to previous screen
    this.previousView = 'main';
    this.currentView = 'main';

    this.state = {
      view: 'default',
      isOpen: false
    };

    // Get the accounts
    const burnerAccounts = Account.getBurnerAddresses();
    if (burnerAccounts.length == 0) {
      Account.createNewBurnerKey();
    }

    this.auxiliaryBaseToken = BaseToken.from('OST', auxiliaryWeb3);

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);

    interval = setInterval(this.poll.bind(this), 7000);
  }

  fetchBalances() {
    const burnerAddress = Account.getBurnerAddresses();
    this.auxiliaryBaseToken.getBalances(burnerAddress, BURNER);
    const bucketAddress = Account.getBucketAddress();
    this.auxiliaryBaseToken.getBalances(bucketAddress, BUCKET);
  }
  poll() {
    this.fetchBalances();
    // Update the view
    this.setState({});
  }
  componentDidMount(){
    this.setState({view: 'main'});
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    //fixme: This is very unefficient.
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
    clearInterval(interval);
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  updateDimensions() {
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

  onVerify(pin) {
    const bucketAddress = Account.getBucketAddress();
    if (bucketAddress.length == 0) {
      Account.createNewBucketKey(pin);
    }
    this.changeView('saving')

  }
  render() {
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

  // View related functions
  defaultView() {
    return (
      <div className="App">
        This is a default view.
      </div>
    )
  }

  mainView() {
    return (
      <div className="App">
        <div className="Card">
          <Flex>
            <Box width={1}>
              <TokenBalance
                token={this.auxiliaryBaseToken}
                context={BURNER}
              />
            </Box>
          </Flex>
          <Flex>
            <Box width={1} mt={2} mb={2}>
              <Transactions
                context={BURNER}
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
      <Saving
        context={BUCKET}
        token={this.auxiliaryBaseToken}
        changeView={this.changeView.bind(this)}
        goBack={this.goBack.bind(this)}
      />
    );
  }

  createPin() {
    return (
      <div className="App">
        <CreatePin
          changeView={this.changeView.bind(this)}
          openModal={this.openModal.bind(this)}
          goBack={this.goBack.bind(this)}
        />
      </div>
    )
  }

  verifyPin() {
    return (
      <div className="App">
        <VerifyPin
          onVerify={this.onVerify.bind(this)}
          goBack={this.goBack.bind(this)}
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
          title={"Burner addresses"}
          token={this.auxiliaryBaseToken}
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
