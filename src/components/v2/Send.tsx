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

interface Balance {
  chain: string;
  amount: string;
}
interface Props {
  location: any;
}

interface State {
  beneficiary: string;
  token: string;
  balances: Balance[];
  amount: string;
  error: string
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
    this.state = {
      beneficiary: '',
      token: 'OST',//this.props.token;
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
  render() {

    const totalBalance = this.state.balances
      .map(b => Web3Utils.toBN(b.amount))
      .reduce((acc, amount) => acc.add(amount)).toString(10);

    return (
      <Card style={{width: '50%'}}>
        <Card.Body>
          {this.state.error.length > 0 ?
            <Alert variant="danger">
              {this.state.error}
            </Alert> : ''
          }
          <Row>
            <Col><h1>Send</h1></Col>
          </Row>
          <ColoredLine color="blue" height="10"/>
          <Row>
            <Col>
              {this.state.token}
            </Col>
            <Col>
              {totalBalance}
            </Col>
          </Row>
          <ColoredLine color="black" height="2"/>
          {this.state.balances.map(b =>
            <Row key={b.chain}>
              <Col>
                {b.chain}
              </Col>
              <Col>
                {b.amount}
              </Col>
            </Row>
          )}

          <ColoredLine color="black" height="2"/>
          <Row>
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
                <Link
                  to="/scanner?redirectURL=/send&key=beneficiary">
                  <Button variant="dark">Scan</Button>
                </Link>
              </InputGroup.Append>
            </InputGroup>
          </Row>

          <Row>
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
          </Row>
          <Row>
            <Col>
              <Button variant="dark"
                      onClick={this.handleSubmit}>Submit</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }

}
