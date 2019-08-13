import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

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

    return <div className="App">
      <div className="Card">
        <h1>Dost app</h1>
      </div>
    </div>
  }

}
