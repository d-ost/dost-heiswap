import React from 'react';
import Utils from '../../KeyManager/Utils'
import Token from "../../viewModels/Token";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import ListGroup from "react-bootstrap/es/ListGroup";

interface Props {
  context: string;
  token: Token;
  showBucketKeyBalances: boolean;
  onClick: any;
}

interface State {
}

export default class TokenBalance extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentWillMount(): void {
  }

  render() {
    const imageName = Utils.getImagePathForSymbol(this.props.token.symbol);
    const image = require(`../../images/${imageName}`);
    return (
      <div>
        <ListGroup variant="flush">
          <ListGroup.Item action>
            <Row onClick={()=>{this.props.onClick(this.props.token)}}>
              <Col xs={5} style={{padding:'0'}}>
                <div style={{paddingRight:'10px', paddingLeft:'10px'}}>
                  <img src={image} height='50' width='50' alt=""/>
                  <span style={{marginLeft:'15px', color:'#34445b'}}>{this.props.token.symbol}</span>
                </div>
              </Col>
              <Col style={{padding:'0',textAlign:'right'}}>
                <div style={{
                  paddingRight: '15px',
                  paddingTop: '15px',
                  color: '#34445b'
                }}> {this.props.token.getBurnerBalance()} </div>
              </Col>
              <Col style={{padding:'0',textAlign:'right', display:`${this.props.showBucketKeyBalances?'block':'none'}`}}>
                <div style={{
                  paddingRight: '15px',
                  paddingTop: '15px',
                  color: '#34445b'
                }}> {this.props.token.getBucketBalance()} </div>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}
