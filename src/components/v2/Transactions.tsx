import React from 'react';
import {connect} from "react-redux";
import Token from "../../viewModels/Token";
import TransactionComponent from "./Transaction";
import Utils from "../../utils/Utils";
import NavigationBarWBB from "./NavigationBarWBB";
import ListGroup from "react-bootstrap/es/ListGroup";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Container from "react-bootstrap/es/Container";
import {Routes} from "./Routes";

interface Props {
  selectedToken: Token;
  history?: any;
}

interface State {

}

class Transactions extends React.Component<Props, State> {


  render() {

    if (!this.props.selectedToken) {
      this.props.history.push(Routes.Main);
      return (null);
    }
    const token = this.props.selectedToken;
    const imageName = Utils.getImagePathForSymbol(token.symbol);
    const image = require(`../../images/${imageName}`);
    return <NavigationBarWBB {...this.props} title='ETH Transactions'>
    <div style={{
      padding: '0px',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,.15)',
      width: '100%',
      backgroundColor: 'white',
    }}>
      <div style={{
        marginLeft: '1px',
        marginRight: '1px',
        paddingBottom: '65px'

      }}>
        <div>

          <div style={{padding: '10px', paddingBottom: '10px'}}>
            <Container style={{
              padding: '0px',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,.15)'
            }}>
              <div
                style={{
                  borderBottomWidth: '1px',
                  borderBottomColor: 'rgb(231, 246, 247)',
                  borderBottomStyle: 'solid'
                }}>
                <ListGroup variant="flush">
                  <ListGroup.Item style={{padding: '0px'}}>
                    <Row style={{backgroundColor: '#34445b'}}>
                      <Col>
                        <div style={{
                          fontWeight: 'bolder',
                          height: '60px',
                          color: 'white',
                          paddingTop: '20px',
                          paddingBottom: '20px',
                          paddingRight: '0px',
                          paddingLeft: '40px'
                        }}> Type
                        </div>
                      </Col>
                      <Col style={{textAlign: 'right'}}>
                        <div style={{
                          fontWeight: 'bolder',
                          height: '60px',
                          color: 'white',
                          paddingRight: '20px',
                          paddingTop: '20px'
                        }}> TransactionHash
                        </div>
                      </Col>
                      <Col style={{
                        textAlign: 'right',
                        height: '60px'
                      }}>
                        <div style={{
                          fontWeight: 'bolder',
                          color: 'white',
                          paddingTop: '20px',
                          paddingBottom: '20px',
                          paddingRight: '20px',
                          paddingLeft: '0px'
                        }}> From
                        </div>
                      </Col>

                      <Col style={{
                        textAlign: 'right',
                        height: '60px'
                      }}>
                        <div style={{
                          fontWeight: 'bolder',
                          color: 'white',
                          paddingTop: '20px',
                          paddingBottom: '20px',
                          paddingRight: '20px',
                          paddingLeft: '0px'
                        }}> To
                        </div>
                      </Col>

                      <Col style={{
                        textAlign: 'right',
                        height: '60px'
                      }}>
                        <div style={{
                          fontWeight: 'bolder',
                          color: 'white',
                          paddingTop: '20px',
                          paddingBottom: '20px',
                          paddingRight: '20px',
                          paddingLeft: '0px'
                        }}> Amount
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </div>
               <div style={{
                 height:'581px',
                 overflow:'scroll'
               }}>
              {token.transactions.map((transaction) =>
                <TransactionComponent
                  transaction={transaction}
                  token={token}/>
              )}
               </div>
            </Container>
          </div>
        </div>

      </div>
    </div>
    </NavigationBarWBB>
  }
}

const mapStateToProps = state => {
  return {
    selectedToken: state.token.selectedToken,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transactions);
