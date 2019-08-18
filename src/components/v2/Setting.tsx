import React, {Component} from 'react'
import TokenBalances from "./TokenBalances";
import Token from "../../viewModels/Token";
import Footer from "./Footer";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Button from "react-bootstrap/es/Button";
import {Routes} from "./Routes";
import NavigationBarWBB from "./NavigationBarWBB";

interface Props {

}

interface State {

}

export default class Setting extends Component<Props, State> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }


  render() {

    return (
      <NavigationBarWBB {...this.props} title='Settings'>
        To be updated
        <Footer>
        </Footer>
      </NavigationBarWBB>
    )
  }

}
