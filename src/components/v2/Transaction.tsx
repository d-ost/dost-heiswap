import React, {Component} from 'react';
import Token from "../../viewModels/Token";
import Transaction from "../../viewModels/Transaction";
import Utils, {NetworkType} from '../../utils/Utils'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/es/ListGroup";
import {fromWei} from "web3-utils";
import AddressHover from './AddressHover';

interface Props {
  transaction:  Transaction;
  token: Token
}

interface State {
  network?: NetworkType;
}

export default class TransactionComponent extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount(): void {
    Utils.getNetworkType().then(nt => {
      this.setState({network: nt})
    })
  }

  render() {
    const txHash = this.props.transaction.transactionHash;
    if (!this.state.network) {
      return null;
    }
    const link = Utils.getEtherScanLinkByNetwork(this.state.network, txHash);
    return <div>
      <ListGroup variant="flush">
        <ListGroup.Item action>
          <Row>
            <Col style={{
              textAlign: 'right',
              height: '25px'
            }}>
              <div style={{paddingRight: '10px', paddingLeft: '10px'}}>
                {this.props.transaction.getType()}
              </div>

            </Col>
            <Col style={{
              textAlign: 'right',
              height: '25px'
            }}>

              <div style={{paddingRight: '10px', paddingLeft: '10px'}}>
                <a
                  href={link}
                  target="_blank"> {txHash.substr(0, 10) + '...'}</a>
              </div>

            </Col>
            <Col style={{
              textAlign: 'right',
              height: '25px'
            }}>
              <AddressHover
                address={this.props.transaction.data.from.address}/>
            </Col>
            <Col style={{
              textAlign: 'right',
              height: '25px'
            }}>
              <AddressHover address={this.props.transaction.data.to}/>
            </Col>
            <Col style={{
              textAlign: 'right',
              height: '25px'
            }}>{parseFloat(fromWei(this.props.transaction.data.amount, 'ether')).toFixed(5)}</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </div>
  }
}

