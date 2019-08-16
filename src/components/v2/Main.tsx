import React, {Component} from 'react';
import Button from "react-bootstrap/es/Button";
import TokenBalances from './TokenBalances';
import defaultProfileImage from "../../images/default_profile.png";
import NavigationBar from "./NavigationBar";
import ModelContainer from "./ModelContainer";
import CreatePin from "./CreatePin";
import VerifyPin from "./VerifyPin";
import {Routes} from "./Routes";


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
    this.state = {modalShow: false};
    //this.handleSettingsBtnClick = this.handleSettingsBtnClick.bind(this);
    this.handleAccountDetailBtnClick = this.handleAccountDetailBtnClick.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }


  handleAccountDetailBtnClick(e) {
    e.preventDefault();
    console.log('redirecting to create-pin page');
    //this.props.history.push(Routes.CreatePin);
    this.setState({modalShow: true});
  }

  getPinVerificationView() {
    //return (<CreatePin history={this.props.history}/>);
    return (<VerifyPin onValidationSuccess={()=>{this.props.history.push(Routes.Savings)}}/>);
  }
  closeModal() {
    this.setState({modalShow: false});
  }
  render() {
    return (
      <NavigationBar>
        <div>
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
          <TokenBalances
            context={this.props.context}
            showBucketKeyBalances={ false }
          />
          <div style={{
            display: 'table',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginBottom: '10px',
            marginTop: '10px',
          }}>
            <Button variant="light" >Receive</Button>
          </div>

        </div>

        <ModelContainer
          show={this.state.modalShow}
          onHide={() => this.closeModal()}
          title='Create Pin'
         >
          {this.getPinVerificationView()}
        </ModelContainer>
      </NavigationBar>
    );
  }

}
