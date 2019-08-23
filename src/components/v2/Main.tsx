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
import {selectToken} from "../../redux/actions";
import {connect} from "react-redux";

interface Props {
  context: string
  history: any;
  onHide?: any;
  title?: any;
  tokens: Token[];
  selectToken: Function;
}

interface State {
  modalShow: boolean;
  showScanner: boolean;
  address: string;
}

class Main extends Component<Props, State> {
  constructor(props) {
    super(props);
    // Fixme: remove hardcoded address
    this.state = {
      modalShow: false,
      showScanner: false,
      address: '0xf4bbddd76488bd10f92d4aa8f6502ea1e01cff34'
    };

    this.handleReceive = this.handleReceive.bind(this);
    this.closeScanner = this.closeScanner.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  tokenClicked(token: Token) {
    console.log('Token clicked: ', token);

    this.props.selectToken(token);
    this.props.history.push({
      pathname: Routes.Send,
      state: {token: token}
    });
  }

  closeModal() {
    this.setState({modalShow: false});
  }

  closeScanner() {
    this.setState({showScanner: false});
  }

  handleScannerResult(address) {
    this.props.history.push({
      pathname: Routes.Send,
      state: {beneficiary: address}
    });
  }

  handleReceive(e) {
    e.preventDefault();
    console.log('Show QR');
    this.setState({modalShow: true});
  }

  handleSend(e) {
    e.preventDefault();
    console.log('Show scanner');
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
            onHide={() => this.closeModal()}/>
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
  console.log('state  ', state);
  return {
    tokens: state.token.tokens,
  }
};

const mapDispatchToProps = {
  selectToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);


/*
<div className="AccountDetailBtn"
               style={{
                 width:100,
                 height:100,
                 backgroundColor:"blue",display: 'table',
                 marginRight: 'auto',
                 marginLeft: 'auto',
                 marginTop: '10px',
               }}
               onClick={this.handleAccountDetailBtnClick}>
            <img src={defaultProfileImage} height='100%' width='100%' alt=""/>
          </div>
          <div style={{
            display: 'table',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}>
            <p style={{marginBottom:'10px'}}>Hello xyz</p>
          </div>
 */
