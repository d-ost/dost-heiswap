import React from 'react';
import Utils from '../../KeyManager/Utils'
import Token from "../../viewModels/Token";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Container from "react-bootstrap/es/Container";
import dostLogo from "../../images/dost.png";

interface Props {
  context: string;
  token: Token;
  showBucketKeyBalances: boolean;
  onClick: any;
}

interface State {
  burnerKeysTotalBalance: string;
  bucketKeysTotalBalance: string
}

export default class TokenBalance extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      burnerKeysTotalBalance: '0',
      bucketKeysTotalBalance: '0'
    }
  }

  componentWillMount(): void {
    // this.setState({balance: this.props.token.totalBalances[this.props.context]});
  }


  render() {
    const imageName = Utils.getImagePathForSymbol(this.props.token.symbol);
    const image = require(`../../images/${imageName}`);
    return (
      <Row style={{borderBottomColor:'red', borderBottomWidth:'10px'}} onClick={()=>{this.props.onClick(this.props.token)}}>
        <Col xs={5} style={{padding:'0'}}>
          <div style={{paddingRight:'10px', paddingLeft:'10px'}}>
            <img src={image} height='50' width='50' alt=""/>
            <span style={{marginLeft:'15px'}}>{this.props.token.symbol}</span>
          </div>
        </Col>
        <Col style={{padding:'0',textAlign:'right'}}>
          <span style={{paddingRight:'15px'}}> {this.state.burnerKeysTotalBalance} </span>
        </Col>
        <Col style={{padding:'0',textAlign:'right', display:`${this.props.showBucketKeyBalances?'block':'none'}`}}>
          <div style={{paddingRight:'15px'}}> {this.state.bucketKeysTotalBalance} </div>
        </Col>
      </Row>
    );
  }
  /*
  render() {
    const imageName = Utils.getImagePathForSymbol(this.props.token.symbol);
    const image = require(`../../images/${imageName}`);
    return (
      <tr>
        <td>{this.props.token.symbol}</td>
        <td>{this.state.burnerKeysTotalBalance}</td>
        <td hidden={!this.props.showBucketKeyBalances}>{this.state.bucketKeysTotalBalance}</td>
      </tr>
    );
  }
   */
}
