import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Main from "./components/v2/Main";
import Send from "./components/v2/Send";
import CreatePin from "./components/v2/CreatePin";
import VerifyPin from "./components/v2/VerifyPin";
import Scanner from "./components/v2/Scanner";
import Saving from "./components/v2/Saving";
import Setting from "./components/v2/Setting";

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
      <div className="CardContainer">
        <Router>
          <Route exact path="/" component={Main}/>
          <Route exact path="/send" component={Send}/>
          <Route exact path="/create-pin" component={CreatePin}/>
          <Route exact path="/verify-pin" component={VerifyPin}/>
          <Route path= "/scanner" component={Scanner}/>
          <Route exact path="/saving" component={Saving}/>
          <Route exact path="/setting" component={Setting}/>
        </Router>
      </div>
    );

  }

}
