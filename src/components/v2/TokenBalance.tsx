import React from 'react';
import Utils from '../../utils/Utils'
import Token from "../../viewModels/Token";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import ListGroup from "react-bootstrap/es/ListGroup";
import {fromWei} from 'web3-utils';
import {Routes} from "./Routes";
import {TiThList} from "react-icons/ti";
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

interface Props {
  context: string;
  token: Token;
  showBucketKeyBalances: boolean;
  onClick: any;
  selectToken: Function;
  history:any;
}

interface State {
}

export default class TokenBalance extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.onViewTransactions = this.onViewTransactions.bind(this);
  }

  componentWillMount(): void {
  }

  onViewTransactions(): void {
    this.props.selectToken(this.props.token);
    this.props.history.push(Routes.Transactions);
  }

  render() {
    const imageName = Utils.getImagePathForSymbol(this.props.token.symbol);
    const image = require(`../../images/${imageName}`);
    return (
      <div>
        <ListGroup variant="flush">
          <ListGroup.Item action>
            <Row>
              <Col style={{padding: '0'}} onClick={() => {
                this.props.onClick(this.props.token)
              }}>
                <div style={{paddingRight:'10px', paddingLeft:'10px'}}>
                  <img src={image} height='50' width='50' alt=""/>
                  <span style={{marginLeft:'15px', color:'#34445b'}}>{this.props.token.symbol}</span>
                </div>
              </Col>
              <Col style={{padding: '0', textAlign: 'right'}} onClick={() => {
                this.props.onClick(this.props.token)
              }}>
                <div style={{
                  paddingRight: '15px',
                  paddingTop: '15px',
                  color: '#34445b'
                }}> {parseFloat(fromWei(this.props.token.getBurnerBalance(), 'ether')).toFixed(5)} </div>
              </Col>
              <Col style={{
                padding: '0',
                textAlign: 'right',
                display: `${this.props.showBucketKeyBalances ? 'block' : 'none'}`
              }} onClick={() => {
                this.props.onClick(this.props.token)
              }}>
                <div style={{
                  paddingRight: '15px',
                  paddingTop: '15px',
                  color: '#34445b'
                }}> {parseFloat(fromWei(this.props.token.getBucketBalance(), 'ether')).toFixed(5)} </div>
              </Col>
              <Col style={{
                padding: '0',
                textAlign: 'right',
              }} onClick = {this.onViewTransactions}>
                  <div style={{
                    paddingRight: '15px',
                    paddingTop: '15px',
                  }}>
                    <OverlayTrigger
                      placement='right'
                      overlay={
                        <Tooltip id={this.props.token.symbol}>
                          View transactions for {this.props.token.symbol}
                        </Tooltip>
                      }
                    >
                      <TiThList style={{
                        width: "2em", height: "2em",
                        color: "rgb(52, 68, 91)"
                      }}/>
                    </OverlayTrigger>
                  </div>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}
