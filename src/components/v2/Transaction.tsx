import React, {Component} from 'react';
import Token from "../../viewModels/Token";
import Transaction from "../../viewModels/Transaction";
import Nav from 'react-bootstrap/Nav'
import Utils from '../../utils/Utils'
interface Props {
  transaction:  Transaction;
  token: Token
}

interface State {

}

export default class TransactionComponent extends Component<Props, State> {


  render() {
    const txHash = this.props.transaction.transactionHash;
    return <tr>
      <th>
        <Nav.Item>
          <Nav.Link href={`${Utils.getEtherScanLink(txHash)}`}> {txHash.substr(0,32) +'...'}</Nav.Link>
        </Nav.Item>
      </th>
      <th>{this.props.transaction.transactionType}</th>
    </tr>
  }
}

