import Web3 from 'web3';
import React, { Component } from 'react';
import logo from './logo.svg';
import EthereumAccount from './components/EthereumAccount'
import Savings from './components/Savings'
import './App.css';
import Account from "./KeyManager/Account";
import Config from './Config';
import Token from "./KeyManager/Token";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default'
    };
    // TODO: This is temp, will change in next commit
    this.account = null;

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
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  updateDimensions() {
    console.log('updateDimensions');
    //force it to rerender when the window is resized to make sure qr fits etc
    this.forceUpdate();
  }

  render() {
    console.log('Render is called');
    console.log('this.state: ', this.state);

    switch (this.state.view) {
      case 'main':
        return this.mainView();
      case 'saving':
        return this.savingView();
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
    // TODO: Remove this test code related to tokens.
    // const config = Config();
    // console.log('config.ORIGIN_CHAIN.RPC: ', config.ORIGIN_CHAIN.RPC);
    //
    // const web3 = new Web3(config.ORIGIN_CHAIN.RPC);
    // const tokenAddress = config.ORIGIN_CHAIN.WETH_ADDRESS;
    // console.log('tokenAddress: ', tokenAddress);
    // const token = Token.from(tokenAddress, web3);
    // token.getBalance(this.account.address).then((result)=> {
    //   console.log('Get balance result: ', result);
    // });
    // token.getTokenInfo().then((result)=>{
    //   console.log('getTokenInfo result: ', result);
    // });

    return (
      <div className="App">
        This is a main view.
        <EthereumAccount
          account={this.account}
        />
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
      />
      </div>
    )
  }
}
