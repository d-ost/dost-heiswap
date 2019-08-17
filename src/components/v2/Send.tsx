import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import {FormControl} from "react-bootstrap";
import {Link} from 'react-router-dom'
import queryString from "query-string";
import * as Web3Utils from 'web3-utils';
import NavigationBarWBB from "./NavigationBarWBB";
import TokenBalance from "./TokenBalance";
import Token from "../../viewModels/Token";
import ModelContainer from "./ModelContainer";
import Scanner from "./Scanner";

interface Balance {
  chain: string;
  amount: string;
}
interface Props {
  location: any;
  context?: any;
}

interface State {
  beneficiary: string;
  token: Token;
  balances: Balance[];
  amount: string;
  error: string;
  modalShow: boolean;
}

const ColoredLine = ({color, height}) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: height
    }}
  />
);

export default class Send extends Component<Props, State> {
  constructor(props) {
    super(props);
    console.log('this.props.location.state: ', this.props.location.state);
    console.log('this.state: ', this.state);
    this.state = {
      beneficiary: '',
      token: this.props.location.state.token,//this.props.token;
      balances: [
        {
          chain: 'Plasma',
          amount: '1',
        },
        {
          chain: 'Mosaic',
          amount: '4',
        },
        {
          chain: 'ETH 1.X',
          amount: '7',
        },
      ],
      amount: '',
      error: '',
      modalShow: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleBeneficiaryChange = this.handleBeneficiaryChange.bind(this);
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    if (values) {
      const beneficiary = values.beneficiary as string;
      if (values.beneficiary) {
        this.setState({
          beneficiary: beneficiary,
        })
      }
    }
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

  handleBeneficiaryChange(e) {
    this.setState({
      beneficiary: e.target.value
    });
  }

  handleSubmit() {

    const {amount, beneficiary} = this.state;
    // Write send transaction logic
    if (!amount || amount.length === 0) {
      this.setState({error: `Invalid Amount ${amount}.`});
      console.log('Invalid Amount', amount);
    }

    if (!beneficiary || beneficiary.length === 0 || !Web3Utils.isAddress(beneficiary)) {
      console.log('Invalid address ', beneficiary);
      this.setState({error: `Invalid beneficiary address ${beneficiary}.`})
    }

    console.log('amount  ', amount);
    console.log('beneficiary  ', beneficiary);
  }

  closeModal() {
    this.setState({modalShow: false});
  }
  render() {

    console.log('-----> State: ', this.state);
    const totalBalance = this.state.balances
      .map(b => Web3Utils.toBN(b.amount))
      .reduce((acc, amount) => acc.add(amount)).toString(10);

    return (
      <NavigationBarWBB {...this.props} title='Send'>
        <div style={{width: '100%', backgroundColor:'white'}}>
          {this.state.error.length > 0 ?
            <Alert variant="danger">
              {this.state.error}
            </Alert> : ''
          }
          <div style={{padding:'10px', borderBottomWidth:'1px', borderBottomStyle:'solid', borderBottomColor:'rgb(231, 246, 247)'}}>
            <TokenBalance
              onClick={()=>{}}
              context={this.props.context}
              token={this.state.token}
              showBucketKeyBalances={false}
            />
          </div>
          {this.state.balances.map(b =>
            <div style={{marginLeft:'10px', marginRight:'10px', padding:'10px', borderBottomWidth:'1px', borderBottomStyle:'solid', borderBottomColor:'rgb(231, 246, 247)'}}>
              <Row style={{borderBottomColor:'red', borderBottomWidth:'10px'}}>
                <Col xs={5} style={{padding:'0'}}>
                  <div style={{paddingRight:'10px', paddingLeft:'10px'}}>
                    <span style={{marginLeft:'15px'}}>{b.chain}</span>
                  </div>
                </Col>
                <Col style={{padding:'0',textAlign:'right'}}>
                  <span style={{paddingRight:'15px'}}> {b.amount} </span>
                </Col>
              </Row>
            </div>
          )}

          <div style={{paddingLeft:'10px', paddingRight:'10px', paddingTop:'30px', paddingBottom:'20px'}}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Ethereum Address"
                aria-label="Address"
                defaultValue={this.state.beneficiary}
                onChange={this.handleBeneficiaryChange}
              />
              <InputGroup.Append>
                <Button variant="dark" onClick={()=>{this.setState({modalShow: true})}}>Scan</Button>
              </InputGroup.Append>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Amount</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Amount in wei"
                aria-label="Amount"
                onChange={this.handleAmountChange}
                type="number"
              />
            </InputGroup>
            <Row>
              <Col>
                <Button variant="dark"
                        onClick={this.handleSubmit}>Submit</Button>
              </Col>
            </Row>
          </div>
        </div>

        <ModelContainer
          show={this.state.modalShow}
          onHide={() => this.closeModal()}
          title='Scan'
        >
          <Scanner onScan={(address) => {this.setState({beneficiary:address}); this.closeModal();}} />
        </ModelContainer>

      </NavigationBarWBB>
    )
  }

}
