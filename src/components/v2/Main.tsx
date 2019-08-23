import React, {Component} from 'react';
import Button from "react-bootstrap/es/Button";
import TokenBalances from './TokenBalances';
import NavigationBar from "./NavigationBar";
import {Routes} from "./Routes";
import Token from "../../viewModels/Token";
import Footer from "./Footer";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Modal from "react-bootstrap/es/Modal";
import Scanner from "./Scanner";
import {QR} from 'rimble-ui';
import Receive from "./Receive";
import {selectToken, addAccount} from "../../redux/actions";
import {connect} from "react-redux";
import {default as Account, AccountType} from "../../viewModels/Account";

interface Props {
  context: string
  history: any;
  onHide?: any;
  title?: any;
  tokens: Token[];
  selectToken: Function;
  addAccount: Function;
}

interface State {
  modalShow: boolean;
  showScanner: boolean;
  address: string;
}

class Main extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      showScanner: false,
      address: '',
    };

    this.handleReceive = this.handleReceive.bind(this);
    this.closeScanner = this.closeScanner.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleScannerResult = this.handleScannerResult.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  tokenClicked(token: Token) {
    this.props.selectToken(token);
    this.props.history.push({
      pathname: Routes.Send,
    });
  }

  closeModal() {
    this.setState({modalShow: false});
  }

  closeScanner() {
    this.setState({showScanner: false});
  }

  handleScannerResult(address) {
    // Select default token on general send
    this.props.selectToken(this.props.tokens[0]);
    this.props.history.push({
      pathname: Routes.Send,
      state: {
        beneficiary: address,
      }
    });
  }

  handleReceive(e) {
    e.preventDefault();
    // Fetch burner address to receive
    const burnerAccount = this.getReceiveAccount();

    console.log(`burner address which will receive`, burnerAccount);
    this.setState({
        modalShow: true,
        address: burnerAccount.address,
    });
  }

  /*
   * Check if receive burner account already exist.
   * If it's not present create new burner account with isReceiveKey = true.
   * Add the same Receive account to all tokens.
   * There is always same receive account in all tokens.
   * Updated redux and localStorage accordingly.
   *
   * Note: On settings page, make sure on addition of new token, receive key is also added.
   */
  getReceiveAccount(): Account {
    let receiveAccount;
    const receiveAccounts = this.props.tokens[0].accounts.filter(account =>
      (account.accountType === AccountType.burner && account.isReceiveKey === true)
    );
    receiveAccount = receiveAccounts[0];
    if (!receiveAccount) {
      const newWeb3Account = window.web3.eth.accounts.create(window.web3.utils.randomHex(32));
      receiveAccount = new Account(AccountType.burner, newWeb3Account.address, true, newWeb3Account.privateKey);
      for(let i=0; i< this.props.tokens.length; i += 1) {
        this.props.addAccount({
          token: this.props.tokens[i],
          account: receiveAccount,
        });
      }
    }
    return receiveAccount;
  }

  handleSend(e) {
    e.preventDefault();
    this.setState({showScanner: true});
  }

  render() {
    return (
      <NavigationBar {...this.props} >
        <div>
          <div style={{marginLeft: '1px', marginRight: '1px', paddingBottom: '65px'}}>
            <TokenBalances
              tokens={this.props.tokens}
              onClick={(token: Token) => (this.tokenClicked(token))}
              context={this.props.context}
              showBucketKeyBalances={false}
            />
          </div>
        </div>
        <Modal show={this.state.modalShow} onHide={() => this.closeModal()}>
          <Receive
            address={this.state.address}
            onHide={() => this.closeModal()}
          />
        </Modal>
        <Modal show={this.state.showScanner} onHide={() => this.closeModal()}>
          <Scanner
            onScan={(address) => this.handleScannerResult(address)}
            onHide={() => this.closeScanner()}/>
        </Modal>

        <Footer>
          <Row style={{margin: '10px'}}>
            <Col style={{paddingRight: '1px', paddingLeft: '0px'}}>
              <Button
                onClick={this.handleReceive}
                style={{
                  fontWeight: 'bolder',
                  display: 'inline',
                  width: '100%',
                  backgroundColor: '#34445b',
                  borderWidth: '0px',
                  color: 'white',
                  height: '55px',
                  boxShadow: '0 5px 15px rgba(0,0,0,.15)',
                  borderTopLeftRadius: '15px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                  borderBottomLeftRadius: '15px',
                  overflow: 'hidden',
                }}>
                Receive
              </Button>
            </Col>
            <Col style={{paddingLeft: '1px', paddingRight: '0px'}}>
              <Button
                onClick={this.handleSend}
                style={{
                  fontWeight: 'bolder',
                  display: 'inline',
                  width: '100%',
                  borderWidth: '0px',
                  backgroundColor: '#34445b',
                  color: 'white',
                  height: '55px',
                  boxShadow: '0 5px 15px rgba(0,0,0,.15)',
                  borderTopLeftRadius: '0px',
                  borderTopRightRadius: '15px',
                  borderBottomRightRadius: '15px',
                  borderBottomLeftRadius: '0px',
                }}>
                Send
              </Button>
            </Col>
          </Row>
        </Footer>
      </NavigationBar>
    );
  }

}


const mapStateToProps = state => {
  return {
    tokens: state.token.tokens,
  }
};

const mapDispatchToProps = {
  selectToken,
  addAccount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
