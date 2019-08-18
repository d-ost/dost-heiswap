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
import Footer from "./Footer";
import Modal from "react-bootstrap/es/Modal";
import Accordion from "react-bootstrap/es/Accordion";
import useAccordionToggle from "react-bootstrap/es/useAccordionToggle";

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
  accordianActionKey: string;
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
      accordianActionKey: '0'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleBeneficiaryChange = this.handleBeneficiaryChange.bind(this);
    this.changeToken = this.changeToken.bind(this);
    this.selectTokens = this.selectTokens.bind(this);
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

  changeToken(token:Token) {
    this.setState({token: token, accordianActionKey: '0'});
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
        <div style={{
          margin: '10px',
          padding:'0px',
          borderRadius:'15px',
          overflow: 'hidden',
          boxShadow: '0 5px 15px rgba(0,0,0,.15)'
        }}>
          <div style={{width: '100%', backgroundColor:'white'}}>
            {this.state.error.length > 0 ?
              <Alert variant="danger">
                {this.state.error}
              </Alert> : ''
            }
            <div style={{padding:'0px', borderBottomWidth:'1px', borderBottomStyle:'solid', borderBottomColor:'rgb(231, 246, 247)'}}>
              <Accordion activeKey={this.state.accordianActionKey}>
                <this.selectTokens eventKey="1">
                  <TokenBalance
                    onClick={()=>{}}
                    context={this.props.context}
                    token={this.state.token}
                    showBucketKeyBalances={false}
                  />
                </this.selectTokens>
                <Accordion.Collapse eventKey="0">
                  <div></div>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="1">
                  <Card.Body style={{padding:'0px'}}>{this.tokenOptions()}</Card.Body>
                </Accordion.Collapse>
              </Accordion>
            </div>
            {this.state.balances.map(b =>
              <div style={{marginLeft:'10px', marginRight:'10px', padding:'10px', borderBottomWidth:'1px', borderBottomStyle:'solid', borderBottomColor:'rgb(231, 246, 247)'}}>
                <Row style={{borderBottomColor:'red', borderBottomWidth:'10px'}}>
                  <Col xs={5} style={{padding:'0'}}>
                    <div style={{paddingRight:'10px', paddingLeft:'10px'}}>
                      <span style={{marginLeft:'15px', color:'#34445b'}}>{b.chain}</span>
                    </div>
                  </Col>
                  <Col style={{padding:'0',textAlign:'right'}}>
                    <span style={{paddingRight:'15px', color:'#34445b'}}> {b.amount} </span>
                  </Col>
                </Row>
              </div>
            )}
          </div>

          <Modal
            show={this.state.modalShow}
            onHide={() => this.closeModal()}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                'Scan'
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Scanner onScan={(address) => {this.setState({beneficiary:address}); this.closeModal();}} />
            </Modal.Body>
          </Modal>
        </div>



        <div style={{
          backgroundColor:'white',
          margin: '10px',
          padding:'0px',
          borderRadius:'15px',
          overflow: 'hidden',
          boxShadow: '0 5px 15px rgba(0,0,0,.15)'
        }}>
          <div style={{paddingLeft:'10px', paddingRight:'10px', paddingTop:'30px', paddingBottom:'20px'}}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1" style={{backgroundColor: 'rgb(231, 246, 247)', borderColor:'rgb(231, 246, 247)', color:'#34445b'}}>To</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                style={{borderColor:'rgb(231, 246, 247)'}}
                placeholder="Ethereum Address"
                aria-label="Address"
                defaultValue={this.state.beneficiary}
                onChange={this.handleBeneficiaryChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1" style={{backgroundColor: 'rgb(231, 246, 247)', borderColor:'rgb(231, 246, 247)', color:'#34445b'}}>Amount</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                style={{borderColor:'rgb(231, 246, 247)'}}
                placeholder="Amount in wei"
                aria-label="Amount"
                onChange={this.handleAmountChange}
                type="number"
              />
            </InputGroup>
          </div>
        </div>

        <Footer>
          <Row style={{margin:'10px'}}>
            <Col style={{paddingRight:'1px', paddingLeft:'0px'}}>
              <Button
                onClick={()=>{this.setState({modalShow: true})}}
                style={{
                  fontWeight:'bolder',
                  display:'inline',
                  width:'100%',
                  backgroundColor: '#34445b',
                  borderWidth:'0px',
                  color:'white',
                  height:'55px',
                  boxShadow: '0 5px 15px rgba(0,0,0,.15)',
                  borderTopLeftRadius:'15px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                  borderBottomLeftRadius: '15px',
                }}>
                Scan
              </Button>
            </Col>
            <Col style={{paddingLeft:'1px', paddingRight:'0px'}}>
              <Button
                onClick={this.handleSubmit}
                style={{
                  fontWeight:'bolder',
                  display:'inline',
                  width:'100%',
                  borderWidth:'0px',
                  backgroundColor: '#34445b',
                  color:'white',
                  height:'55px',
                  boxShadow: '0 5px 15px rgba(0,0,0,.15)',
                  borderTopLeftRadius:'0px',
                  borderTopRightRadius: '15px',
                  borderBottomRightRadius: '15px',
                  borderBottomLeftRadius: '0px',
                }}>
                Submit
              </Button>
            </Col>
          </Row>
          <div style={{
            width:'100%'
          }}>


          </div>
        </Footer>
      </NavigationBarWBB>
    )
  }

  tokenOptions() {
    const tokens = Token.getAll();
    return(
      <div style={{width: '100%'}}>
        <div style={{width: '100%', height:'20px', WebkitBoxShadow:'inset 0 10px 10px -5px rgba(0,0,0,0.15)'}}></div>
        <div style={{ paddingLeft: '20px', paddingRight: '20px'}}>
          <div style={{borderBottomWidth:'1px',
            borderBottomColor:'rgb(231, 246, 247)',
            borderBottomStyle:'solid'}}>
            <p style={{padding: '10px', color:'#34445b', fontWeight: 'bolder'}}>Select Token</p>
          </div>
          {tokens.map((value, index) => {
            if (this.state.token.symbol !== value.symbol) {
              return <div
                style={{
                  borderBottomWidth:'1px',
                  borderBottomColor:'rgb(231, 246, 247)',
                  borderBottomStyle:'solid'
                }}>
                <TokenBalance
                  onClick={(selectedToken: Token)=>{this.changeToken(selectedToken)}}
                  context={this.props.context}
                  token={value}
                  showBucketKeyBalances={false}
                />
              </div>
            } else {
              return (
                <div></div>
              );
            }
          })}
        </div>
        <div style={{width: '100%', height:'20px', WebkitBoxShadow:'inset 0 -10px 10px -5px rgba(0,0,0,0.15)'}}></div>
      </div>
    );
  }
  selectTokens({ children, eventKey }) {
    const toggle = useAccordionToggle(eventKey, () =>{
      console.log('hello the control is here', this.state);
      this.setState({accordianActionKey: '1'})
    });
    return (
      <div
        onClick={toggle}
        style={{
          padding:'0px',
          borderBottomWidth:'1px',
          borderBottomStyle:'solid',
          borderBottomColor:'rgb(231, 246, 247)'
        }}>
        {children}
      </div>
    );
  }

}
/*
<div>
          <p style={{padding: '10px'}}>Select Token</p>
        </div>
        {tokens.map((value, index) => {
          return <div
            style={{
              borderBottomWidth:'1px',
              borderBottomColor:'rgb(231, 246, 247)',
              borderBottomStyle:'solid'
            }}>
            <TokenBalance
              onClick={()=>{}}
              context={this.props.context}
              token={value}
              showBucketKeyBalances={false}
            />
          </div>
        })}
 */
