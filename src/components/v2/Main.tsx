import React, {Component} from 'react';
import Button from "react-bootstrap/es/Button";
import TokenBalances from './TokenBalances';
import defaultProfileImage from "../../images/default_profile.png";
import NavigationBar from "./NavigationBar";
import ModelContainer from "./ModelContainer";
import CreatePin from "./CreatePin";
import VerifyPin from "./VerifyPin";
import {Routes} from "./Routes";
import Token from "../../viewModels/Token";
import Footer from "./Footer";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";


interface Props {
  context: string
  history: any;
  onHide?:any;
  title?:any;
}

interface State {
  redirectURL?: string,
  modalShow: boolean;
}

export default class Main extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  tokenClicked(token:Token) {
    console.log('Token clicked: ', token);

    this.props.history.push({
      pathname: Routes.Send,
      state: { token: token }
    });
  }
  render() {
    return (
      <NavigationBar {...this.props} >
        <div>
          <div style={{marginLeft:'1px', marginRight:'1px', paddingBottom: '65px'}}>
            <TokenBalances
              onClick={(token:Token)=>(this.tokenClicked(token))}
              context={this.props.context}
              showBucketKeyBalances={ false }
            />
          </div>
        </div>

        <Footer>
          <Row style={{margin:'10px'}}>
            <Col style={{paddingRight:'5px', paddingLeft:'0px'}}>
              <Button style={{
                display:'inline',
                width:'100%',
                backgroundColor: 'white',
                borderWidth:'0px',
                color:'black',
                height:'55px',
                boxShadow: '0 5px 15px rgba(0,0,0,.15)',
              }}>
                Receive
              </Button>
            </Col>
            <Col style={{paddingLeft:'5px', paddingRight:'0px'}}>
              <Button
                style={{
                  display:'inline',
                  width:'100%',
                  borderWidth:'0px',
                  backgroundColor: 'white',
                  color:'black',
                  height:'55px',
                  boxShadow: '0 5px 15px rgba(0,0,0,.15)',
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
