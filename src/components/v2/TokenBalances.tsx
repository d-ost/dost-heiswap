import React from 'react';
import {connect} from "react-redux";
import Token from "../../viewModels/Token";
import TokenBalance from "./TokenBalance"
import Container from "react-bootstrap/es/Container";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import ListGroup from "react-bootstrap/es/ListGroup";
import {addTransaction, selectToken} from "../../redux/actions";

interface Props {
  context: string;
  showBucketKeyBalances: boolean;
  onClick: any;
  tokens: Token[];
  selectToken: Function;
  history:any;
}

interface State {

}

class TokenBalances extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount(): void {}

  render() {
    const tokens = this.props.tokens;
    return (
      <div style={{padding:'10px', paddingBottom:'10px'}}>
        <Container style={{
          padding:'0px',
          borderRadius:'15px',
          overflow: 'hidden',
          boxShadow: '0 5px 15px rgba(0,0,0,.15)'
        }}>
          <div
            style={{
              borderBottomWidth:'1px',
              borderBottomColor:'rgb(231, 246, 247)',
              borderBottomStyle:'solid'
            }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{padding:'0px'}}>
                <Row style={{backgroundColor:'#34445b'}}>
                  <Col  >
                    <div style={{
                      fontWeight:'bolder',
                      height: '60px',
                      color:'white',
                      paddingTop: '20px',
                      paddingBottom: '20px',
                      paddingRight: '0px',
                      paddingLeft: '40px'
                    }}> Tokens </div>
                  </Col>
                  <Col style={{textAlign:'right'}}>
                    <div style={{
                      fontWeight:'bolder',
                      height: '60px',
                      color:'white',
                      paddingRight: '20px',
                      paddingTop: '20px'
                    }}> Balance </div>
                  </Col>
                  <Col style={{textAlign:'right', display:this.props.showBucketKeyBalances?'block':'none',  height: '60px'}} >
                    <div style={{
                      fontWeight:'bolder',
                      color:'white',
                      paddingTop: '20px',
                      paddingBottom: '20px',
                      paddingRight: '20px',
                      paddingLeft: '0px'
                    }}> Reserve </div>
                  </Col>

                  <Col style={{
                    textAlign: 'right',
                    height: '60px'
                  }} >
                    <div style={{
                      fontWeight: 'bolder',
                      color: 'white',
                      paddingTop: '20px',
                      paddingBottom: '20px',
                      paddingRight: '20px',
                      paddingLeft: '0px'
                    }}> Transactions
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </div>
          {tokens.map((value, index) => {
            return <div
              style={{
                borderBottomWidth:'1px',
                borderBottomColor:'rgb(231, 246, 247)',
                borderBottomStyle:'solid'
              }}>
              <TokenBalance
                onClick={this.props.onClick}
                context={this.props.context}
                token={value}
                selectToken={this.props.selectToken}
                history={this.props.history}
                showBucketKeyBalances={this.props.showBucketKeyBalances}
              />
            </div>
          })}
        </Container>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    selectedToken: state.token.selectedToken,
  };
};

const mapDispatchToProps = {
  selectToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TokenBalances);
