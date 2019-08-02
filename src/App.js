import React, { Component } from 'react';
import logo from './logo.svg';
import EthereumAccount from './components/EthereumAccount'
import './App.css';
import Account from "./KeyManager/Account";

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
      </div>
    )
  }
}
