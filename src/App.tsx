import React, {Component} from 'react';
import {Flex, Box} from 'rimble-ui';
import './App.css';
import {Account} from "./KeyManager/Account";
import TokenBalance from "./components/TokenBalance";
import Send from "./components/Send";
import CreatePin from "./components/CreatePin";
import VerifyPin from "./components/VerifyPin";
import ScanQR from "./components/ScanQR";
import Transactions from "./components/Transactions";
import Advanced from './components/Advanced'

import config from './config/Config';

import BaseToken from "./KeyManager/BaseToken";
import BurnerAction from "./components/BurnerAction";
import Receive from "./components/Receive";
import AdvancedAction from "./components/AdvancedAction";
import Saving from "./components/Saving";


const originTokens = config.getOriginTokenAddresses(),
  auxiliaryTokens = config.getAuxiliaryTokenAddresses(),
  originWeb3 = config.originWeb3(),
  auxiliaryWeb3 = config.auxiliaryWeb3();

let interval;

const BURNER = 'BURNER';
const BUCKET = 'BUCKET';

interface Props {

}

interface State {
  previousView: string;
  currentView: string;
  view: string;
  isOpen: boolean;
  auxiliaryBaseToken: BaseToken;
  callBack?: Function;
}

export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);

    // Fixme: This is a quick fix for hackathon, this is used while going back
    // from one screen to previous screen

    this.state = {
      view: 'default',
      isOpen: false,
      previousView: 'main',
      currentView: 'main',
      auxiliaryBaseToken: BaseToken.from('OST', auxiliaryWeb3),
    }
    ;

    // Get the accounts
    const burnerAccounts = Account.getBurnerAddresses();
    if (burnerAccounts.length == 0) {
      Account.createNewBurnerKey();
    }

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);

    interval = setInterval(this.poll.bind(this), 7000);
  }

  fetchBalances() {
    const burnerAddress = Account.getBurnerAddresses();
    this.state.auxiliaryBaseToken.getBalances(burnerAddress, BURNER);
    const bucketAddress = Account.getBucketAddress();
    this.state.auxiliaryBaseToken.getBalances(bucketAddress, BUCKET);
  }

  poll() {
    this.fetchBalances();
    // Update the view
    this.setState({});
  }

  componentDidMount() {
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

  changeView(view, callBack) {
    console.log('Change view called: ', view);
    this.setState({
      previousView: this.state.currentView,
      currentView: view,
      callBack: callBack,
    });
    this.setState({view: view});
  }

  goBack() {
    this.changeView(this.state.previousView, () => {
    });
  }

  onVerify(pin) {
    const bucketAddress = Account.getBucketAddress();
    if (bucketAddress.length == 0) {
      Account.createNewBucketKey(pin);
    }
    this.changeView('saving', () => {
    });

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
        if (pin && pin.length > 0) {
          return this.verifyPin();
        } else {
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
                token={this.state.auxiliaryBaseToken}
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
        token={this.state.auxiliaryBaseToken}
        changeView={this.changeView.bind(this)}
        goBack={this.goBack.bind(this)}
        openModal={this.openModal.bind(this)}
      />
    );
  }

  createPin() {
    return (
      <div className="App">
        <CreatePin
          confirmPin={''} // todo fix this
          changeView={this.changeView.bind(this)}
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
        />
      </div>
    )
  }

  sendView() {
    return (
      <div className="App">
        <Send
          changeView={this.changeView.bind(this)}
          token={this.state.auxiliaryBaseToken}
          context={BURNER}
          goBack={this.goBack.bind(this)}
        />
      </div>
    );
  }

  receiveView() {
    return (
      <div className="App">
        <Receive
          closeModel={this.closeModal}
          goBack={this.goBack.bind(this)}
        />
      </div>
    );
  }

  scanQRView() {
    return (
      <div className="App">
        <ScanQR
          goBack={this.goBack.bind(this)}
          callBack={this.state.callBack!}
        />
      </div>
    );
  }

  advanceView() {
    return (
      <div className="App">
        <Advanced
          title={"Burner addresses"}
          token={this.state.auxiliaryBaseToken}
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
