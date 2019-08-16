import React, {Component} from 'react';
import { MdLockOpen, MdLockOutline } from 'react-icons/md';
import { Row, Col, Container, Table } from "react-bootstrap";
import NavigationBarWBB from "./NavigationBarWBB";

interface Props {

}

interface State {

}

export default class CreatePin extends Component<Props, State> {

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
      <NavigationBarWBB {...this.props} title='Savings'>

        <Table hover>
          <thead style={{backgroundColor:'white'}}>
          <tr>
            <th>Token</th>
            <th></th>
            <th></th>
            <th colSpan={3} style={{textAlign: "right"}}>Burner</th>
            <th style={{textAlign: "right"}}>Reserve</th>
          </tr>
          </thead>
          <tbody  style={{backgroundColor:'white'}}>
          <tr>
            <td style={{textAlign: "left"}}>OST</td>
            <td></td>
            <td></td>
            <td colSpan={3} style={{textAlign: "right"}}>10</td>
            <td style={{textAlign: "right"}}>1000</td>
          </tr>
          <tr>
            <td style={{textAlign: "left"}}>wEth</td>
            <td></td>
            <td></td>
            <td colSpan={3} style={{textAlign: "right"}}>10</td>
            <td style={{textAlign: "right"}}>1000</td>
          </tr>
          <tr>
            <td style={{textAlign: "left"}}>DAI</td>
            <td></td>
            <td></td>
            <td colSpan={3} style={{textAlign: "right"}}>10</td>
            <td style={{textAlign: "right"}}>1000</td>
          </tr>
          <tr>
            <td style={{textAlign: "left"}}>USDC</td>
            <td></td>
            <td></td>
            <td colSpan={3} style={{textAlign: "right"}}>10</td>
            <td style={{textAlign: "right"}}>1000</td>
          </tr>
          </tbody>
        </Table>
      </NavigationBarWBB>
    )
  }

}
