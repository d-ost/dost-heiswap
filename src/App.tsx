import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Main from "./components/v2/Main";
import Send from "./components/v2/Send";
import SelectReserve from "./components/v2/SelectReserve";
import Web3 from "web3";

declare global {
  interface Window { web3: Web3; }
}

interface Props {

}

interface State {

}

export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {}
    }


  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }


  render() {

    return (
      <div className="container-fluid" style={{maxWidth: '500px'}}>
        <Router>
          <Route exact path="/" component={Main}/>
          <Route exact path="/send" component={Send}/>
          <Route exact path="/selectreserve" component={SelectReserve}/>
        </Router>
      </div>
    );

  }

}
