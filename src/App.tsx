import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Main from "./components/v2/Main";
import Send from "./components/v2/Send";
import SelectReserve from "./components/v2/SelectReserve";
import Web3 from "web3";
import CreatePin from "./components/v2/CreatePin";
import VerifyPin from "./components/v2/VerifyPin";
import Scanner from "./components/v2/Scanner";
import Saving from "./components/v2/Saving";
import Setting from "./components/v2/Setting";
import Withdraw from "./components/v2/Withdraw";

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
    console.log('Gere in App.tsx');
    return (
        <Router>
          <Route exact path="/" component={Main}/>
          <Route exact path="/send" component={Send}/>
          <Route exact path="/selectreserve" component={SelectReserve}/>
          <Route exact path="/create-pin" component={CreatePin}/>
          <Route exact path="/verify-pin" component={VerifyPin}/>
          <Route exact path= "/scanner" component={Scanner}/>
          <Route exact path="/saving" component={Saving}/>
          <Route exact path="/settings" component={Setting}/>
          <Route exact path="/withdraw" component={Withdraw}/>
        </Router>
    );
  }
}
/*


<div className="container-fluid" style={{maxWidth: '500px'}}>
        <Router>
          <Route exact path="/" component={Main}/>
          <Route exact path="/send" component={Send}/>
          <Route exact path="/selectreserve" component={SelectReserve}/>
          <Route exact path="/create-pin" component={CreatePin}/>
          <Route exact path="/verify-pin" component={VerifyPin}/>
          <Route path= "/scanner" component={Scanner}/>
          <Route exact path="/saving" component={Saving}/>
          <Route exact path="/setting" component={Setting}/>
        </Router>
      </div>


//
// <div className="card" style={{maxWidth:'48rem', paddingLeft:'0px', paddingRight:'0px'}}>
//   <!-- Just an image -->
//
//
//   <div className="card-header">Header</div>
//   <div className="card-body text-primary">
//     <h5 className="card-title">Primary card title</h5>
//     <p className="card-text">Some quick example text to build on the card
//       title and make up the bulk of the card's content.</p>
//   </div>
// </div>
 */
