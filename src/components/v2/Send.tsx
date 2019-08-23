import React, {Component} from 'react';
import {connect} from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import {FormControl} from "react-bootstrap";
import * as Web3Utils from 'web3-utils';
import NavigationBarWBB from "./NavigationBarWBB";
import TokenBalance from "./TokenBalance";
import Token from "../../viewModels/Token";
import Scanner from "./Scanner";
import Footer from "./Footer";
import Modal from "react-bootstrap/es/Modal";
import Accordion from "react-bootstrap/es/Accordion";
import useAccordionToggle from "react-bootstrap/es/useAccordionToggle";
import Transaction, {TransactionType} from "../../viewModels/Transaction";
import Account, {AccountType} from "../../viewModels/Account";
import {
  addTransaction,
} from "../../redux/actions";
import {Routes} from "./Routes";
import Utils from "../../utils/Utils";
import {ORIGIN_GAS_PRICE} from "../../utils/Constants";
import BigNumber from "bignumber.js";
import {toWei} from "web3-utils";

interface Props {
  tokens: Token[],
  selectedToken: Token;
  context?: any;
  history: any;
  addTransaction: Function,
}

interface State {
  beneficiary: string;
  selectedToken: Token;
  amount: string;
  error: string;
  modalShow: boolean;
  accordianActionKey: string;
  etherScanLink: string;
  transactionHash: string;
}

class Send extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      beneficiary: '',
      selectedToken: this.props.selectedToken,
      amount: '',
      error: '',
      modalShow: false,
      accordianActionKey: '0',
      etherScanLink: '',
      transactionHash: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleBeneficiaryChange = this.handleBeneficiaryChange.bind(this);
    this.changeToken = this.changeToken.bind(this);
    this.selectTokens = this.selectTokens.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  handleAmountChange(e) {
    let val = e.target.value;
    this.setState({
      amount: val ? toWei(val, 'ether').toString(10) : val
    });
  }

  handleBeneficiaryChange(e) {
    this.setState({
      beneficiary: e.target.value
    });
  }

  async handleSubmit() {
    // Reset etherScanLink link.
    this.setState({
      etherScanLink: '',
      transactionHash: '',
    });
    const {amount, beneficiary} = this.state;
    if (!amount || amount.length === 0) {
      this.setState({error: `Invalid Amount ${amount}.`});
      console.log('Invalid Amount', amount);
    }

    if (!beneficiary || beneficiary.length === 0 || !Web3Utils.isAddress(beneficiary)) {
      console.log('Invalid address ', beneficiary);
      this.setState({error: `Invalid beneficiary address ${beneficiary}.`})
    }

    try {
      const account = this.getFundedBurnerAccount(amount);
      const txHash = await Transaction.transferBaseToken(account, beneficiary, amount, ORIGIN_GAS_PRICE);
      const etherScanLink = await Utils.getEtherScanLink(txHash);
      this.setState({
        transactionHash: txHash,
        etherScanLink: etherScanLink,
      });
      this.props.addTransaction({
        transactionHash: txHash,
        transactionType: TransactionType.baseTokenTransfer,
        data: {
          from: account,
          to: beneficiary,
          amount: amount,
        },
      });
    } catch(err) {
      this.setState({
        error: 'Error sending transaction. Please check if you have sufficient funds.'
      });
    }
  }

  // Filter the account by type Burner.
  // Loop over burner accounts.
  // Check if burner account balance contains eth higher than (transferAmount+gasPrice*gas)
  // if burner account balance is not sufficient => Return error
  // else return first burner account.
  getFundedBurnerAccount(amountToTransfer): Account {
    const burnerAccounts = this.state.selectedToken.accounts.filter(
      account => account.accountType === AccountType.burner
    );
    const gasToBeUsed = Transaction.baseTokenTransferGasUsed(ORIGIN_GAS_PRICE);
    const fundNeeded = (new BigNumber(amountToTransfer)).add(gasToBeUsed);
    let accountToUse;
    for (let i = 0; i < burnerAccounts.length; i += 1) {
      if(burnerAccounts[i].balance.gt(fundNeeded)) {
        accountToUse = burnerAccounts[i];
        break;
      }
    }
    console.log('burnerAccountToUse:', accountToUse);
    if (!accountToUse) {
      throw new Error('Non Availability of funded burner account.');
    }
    return accountToUse;
  }

  changeToken(token:Token) {
    this.setState({selectedToken: token, accordianActionKey: '0'});
  }

  closeModal() {
    this.setState({modalShow: false});
  }
  render() {
    if (!this.props.selectedToken) {
      this.props.history.push(Routes.Main);
      return (null);
    }
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
            {this.state.etherScanLink ?
              <Alert variant="success">
                Transaction {this.state.transactionHash} is in progress.&nbsp;
                {this.state.etherScanLink.indexOf('http') !== -1 ?
                <Alert.Link href={this.state.etherScanLink} target="_blank"> Click to Track Status</Alert.Link>
                : ''}
              </Alert> : ''
            }
            <div style={{padding:'0px', borderBottomWidth:'1px', borderBottomStyle:'solid', borderBottomColor:'rgb(231, 246, 247)'}}>
              <Accordion activeKey={this.state.accordianActionKey}>
                <this.selectTokens eventKey="1">
                  <TokenBalance
                    onClick={()=>{}}
                    context={this.props.context}
                    token={this.state.selectedToken}
                    showBucketKeyBalances={false}
                  />
                </this.selectTokens>
                <Accordion.Collapse eventKey="0">
                  <div></div>
                </Accordion.Collapse>
                {
                  this.props.tokens.length > 1
                 ? <Accordion.Collapse eventKey="1">
                  <Card.Body style={{padding:'0px'}}>this.tokenOptions()</Card.Body>
                </Accordion.Collapse>
                 : ''
                }
              </Accordion>
            </div>
          </div>

          <Modal show={this.state.modalShow} onHide={() => this.closeModal()}>
            <Scanner
              onScan={(address) => {this.setState({beneficiary:address}); this.closeModal();}}
              onHide={() => this.closeModal()}/>
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
                placeholder="Amount in ether"
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
    return(
      <div style={{width: '100%'}}>
        <div style={{width: '100%', height:'20px', WebkitBoxShadow:'inset 0 10px 10px -5px rgba(0,0,0,0.15)'}}></div>
        <div style={{ paddingLeft: '20px', paddingRight: '20px'}}>
          <div style={{borderBottomWidth:'1px',
            borderBottomColor:'rgb(231, 246, 247)',
            borderBottomStyle:'solid'}}>
            <p style={{padding: '10px', color:'#34445b', fontWeight: 'bolder'}}>Select Token</p>
          </div>
          {this.props.tokens.map((value, index) => {
            if (this.state.selectedToken.symbol !== value.symbol) {
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
      this.setState({accordianActionKey: this.state.accordianActionKey === '1'?'0':'1'})
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
const mapStateToProps = state => {
  return {
    selectedToken: state.token.selectedToken,
    tokens: state.token.tokens,
  };
};

const mapDispatchToProps = {
  addTransaction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Send);
