import React, {Component} from 'react'
import dostLogo from "../../images/dost.png";
import settingsLogo from '../../images/settings.png';
import profileIcon from '../../images/profileicon.png';
import {Routes} from "./Routes";
import ModelContainer from "./ModelContainer";
import VerifyPin from "./VerifyPin";

interface Props {
  history?: any;
}

interface State {
  modalShow: boolean;
}

export default class NavigationBar extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {modalShow: false};
    this.handleSettingsBtnClick = this.handleSettingsBtnClick.bind(this);
    this.handleAccountDetailBtnClick = this.handleAccountDetailBtnClick.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  handleSettingsBtnClick(e) {
    e.preventDefault();
    console.log('redirecting to settings page');
    (this.props as any).history.push(Routes.Settings);
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
      <div style={{maxWidth:'48rem', width:'100%', backgroundColor:'#e7f6f7', boxShadow: '0 5px 15px rgba(0,0,0,.25)'}}>
        <div className="fixed-top" style={{
          width:'100%',
          maxWidth:'48rem',
          display: 'table',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}>
          <div
            className="navbar navbar-light"
            style={{
              backgroundColor: 'white',
              boxShadow: '0 5px 15px rgba(0,0,0,.25)',
            }}>
            <a className="navbar-brand" href="/">
              <img src={dostLogo} height='30' width='30' alt=""/>
              <span style={{
                marginLeft:'15px',
                fontWeight:'bolder',
                color:'#34445b'
              }}>
                d-OST Wallet
              </span>
            </a>
            <div className="SettingsBtn">
              <img src={profileIcon} height='35px' width='35px' style={{marginRight:'10px'}} alt="" onClick={this.handleAccountDetailBtnClick}/>
              <img src={settingsLogo} height='30px' width='30px' alt="" onClick={this.handleSettingsBtnClick}/>
            </div>
          </div>
        </div>
        <div style={{marginTop:'65px'}}>
          {this.props.children}
          <ModelContainer
            show={this.state.modalShow}
            onHide={() => this.closeModal()}
            title='Create Pin'
          >
            {this.getPinVerificationView()}
          </ModelContainer>
        </div>
      </div>

    );
  }

  /*
    render() {
      return (
        <div style={{maxWidth:'48rem', width:'100%', backgroundColor:'#e7f6f7'}}>
          <nav
            className="navbar navbar-light bg-light"
            style={{
              boxShadow: '0 5px 15px rgba(0,0,0,.25)',
            }}>
            <a className="navbar-brand" href="/">
              <img src={dostLogo} height='30' width='30' alt=""/>
              <span style={{marginLeft:'15px'}}>dOST</span>
            </a>
            <div className="SettingsBtn">
              <img src={profileIcon} height='35px' width='35px' style={{marginRight:'10px'}} alt="" onClick={this.handleAccountDetailBtnClick}/>
              <img src={settingsLogo} height='30px' width='30px' alt="" onClick={this.handleSettingsBtnClick}/>
            </div>
          </nav>
          {this.props.children}

          <ModelContainer
            show={this.state.modalShow}
            onHide={() => this.closeModal()}
            title='Create Pin'
          >
            {this.getPinVerificationView()}
          </ModelContainer>
        </div>
      )
    }

   */
}
