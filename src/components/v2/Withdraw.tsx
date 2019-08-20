import React, {Component} from 'react'
import Footer from "./Footer";
import NavigationBarWBB from "./NavigationBarWBB";
import {connect} from "react-redux";
import Token from "../../viewModels/Token";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/es/ListGroup";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Utils from "../../KeyManager/Utils";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import {ReserveAccount} from "../../models/SelectReserveModel";
import Form from 'react-bootstrap/Form'
import {Routes} from "./Routes";
import Button from "react-bootstrap/es/Button";

interface Props {
  selectedToken: Token;
  reserves: ReserveAccount[],
  history: any,
}

interface State {
  error: string;
  amount: string;
  reserve: string;
  pendingTopup: boolean;
}

class Withdraw extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      amount: '1000000000000000000',
      reserve: '',
      pendingTopup: false,
    }
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleReserveChange = this.handleReserveChange.bind(this);
    this.handleTopup = this.handleTopup.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({
      reserve: this.props.reserves[0].type
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  handleAmountChange(e) {
    this.setState({
      amount: e.target.value
    });
  }

  handleReserveChange(e) {
    console.log('reserve change  ', e.target.value);

    this.setState({
      reserve: e.target.value
    });
  }

  async handleTopup() {
    const amount = this.state.amount;
    const reserve = this.state.reserve;

    if (!amount || amount.length === 0 || amount === '0') {
      this.setState({
        error: 'Please enter valid amount.',
      })
      return;
    } else if (!reserve || reserve.length === 0) {
      this.setState({
        error: 'Please select a reserve.',
      })
      return;
    } else this.setState({
      error: '',
    });
    let account = window.web3.eth.accounts.create();
    const reserveAccount = this.props.reserves.filter(res => res.type === this.state.reserve)[0];
    this.setState({
      pendingTopup: true
    });
    window.web3.eth.sendTransaction({
      from: reserveAccount.account,
      to: account.address,
      value: this.state.amount,
    }).on('transactionHash', (transactionHash) => {
      console.log('transactionHash  ', transactionHash);
      this.setState({
        pendingTopup: false,
      });
      this.props.history.push(Routes.Savings);
    })
      .on('error', (error) => {
        console.log('error  ', error);
        this.setState({
          pendingTopup: false,
        })
      });
  }

  render() {
    const imageName = Utils.getImagePathForSymbol(this.props.selectedToken.symbol);
    const image = require(`../../images/${imageName}`);
    const reserves = this.props.reserves.filter(res => res.account && res.account.length > 0);
    return (
      <NavigationBarWBB {...this.props} title='Top-up'>

        <div style={{
          margin: '10px',
          padding: '0px',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 5px 15px rgba(0,0,0,.15)'
        }}>
          <div style={{width: '100%', backgroundColor: 'white'}}>
            {this.state.error.length > 0 ?
              <Alert variant="danger">
                {this.state.error}
              </Alert> : ''
            }
            <div style={{
              padding: '0px',
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'rgb(231, 246, 247)'
            }}>
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
                          }}>{this.props.selectedToken.symbol}</span>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div style={{padding: '15px'}}>
                <div>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1" style={{
                        backgroundColor: 'rgb(231, 246, 247)',
                        borderColor: 'rgb(231, 246, 247)',
                        color: '#34445b'
                      }}>Amount</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      style={{borderColor: 'rgb(231, 246, 247)'}}
                      placeholder="Amount in wei"
                      aria-label="Amount"
                      onChange={this.handleAmountChange}
                      type="number"
                      defaultValue={this.state.amount}
                    />
                  </InputGroup>
                </div>

                <div>
                  <Form.Label>{reserves.length > 0 ? 'Select Reserve:' : 'No reserve is connected'}</Form.Label>
                </div>
                <div>
                  <div>
                    {
                      reserves.map(res => {
                        console.log('res  ', res);
                        return <Form.Check
                          custom
                          type='radio'
                          label={res.title}
                          id={res.type}
                          onChange={this.handleReserveChange}
                          value={res.type}
                          checked={this.state.reserve === res.type}
                        />
                      })}
                  </div>
                  <div style={{padding: '15px'}}>
                    {
                      reserves.length === 0 ?
                        <Button
                          onClick={() => {
                            this.props.history.push(Routes.SelectReserve);
                          }}
                          style={{
                            fontWeight: 'bolder',
                            display: 'inline',
                            width: '100%',
                            backgroundColor: '#34445b',
                            color: 'white',
                            borderWidth: '0px',
                            height: '55px',
                            boxShadow: '0 5px 15px rgba(0,0,0,.15)',
                            borderRadius: '15px',
                          }}>
                          Add Reserve
                        </Button>
                        : <Button
                          onClick={this.handleTopup}
                          disabled={this.state.pendingTopup}
                          style={{
                            fontWeight: 'bolder',
                            display: 'inline',
                            width: '100%',
                            backgroundColor: '#34445b',
                            color: 'white',
                            borderWidth: '0px',
                            height: '55px',
                            boxShadow: '0 5px 15px rgba(0,0,0,.15)',
                            borderRadius: '15px',
                          }}>
                          Top-up
                        </Button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer>
        </Footer>
      </NavigationBarWBB>
    )
  }

}


const mapStateToProps = state => {

  console.log('state  ', state);
  return {
    selectedToken: state.token.selectedToken,
    reserves: state.reserves.reserves,
  }
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Withdraw);


