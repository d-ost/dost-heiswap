import React from 'react';
import {connect} from "react-redux";
import Token from "../../viewModels/Token";
import TransactionComponent from "./Transaction";
import Utils from "../../utils/Utils";
import NavigationBarWBB from "./NavigationBarWBB";
import ListGroup from "react-bootstrap/es/ListGroup";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Table from 'react-bootstrap/Table'

interface Props {
  selectedToken: Token;
  history?: any;
}

interface State {

}

class Transactions extends React.Component<Props, State> {


  render() {

    const token = this.props.selectedToken;
    const imageName = Utils.getImagePathForSymbol(token.symbol);
    const image = require(`../../images/${imageName}`);
    return <NavigationBarWBB {...this.props} title='Transactions'>
    <div style={{
      margin: '10px',
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

              <div>
                <ListGroup variant="flush">
                  <ListGroup.Item action>
                    <Row>
                      <Col style={{padding: '0'}}>
                        <div
                          style={{
                            paddingRight: '10px',
                            paddingLeft: '10px',
                            marginLeft: '43%'
                          }}>
                          <img src={image} height='50' width='50' alt=""/>
                          <span style={{
                            marginLeft: '15px',
                            color: '#34445b'
                          }}>{token.symbol}</span>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <Table striped bordered hover>

                <thead>
                <tr>
                  <th>Transaction hash</th>
                  <th>Type</th>
                </tr>
                </thead>
              {token.transactions.map((transaction) =>
                <TransactionComponent
                  transaction={transaction}
                  token={token}/>
              )}
              </Table>
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
