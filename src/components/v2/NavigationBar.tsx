import React, {Component} from 'react'
import dostLogo from "../../images/dost.png";
import settingsLogo from '../../images/settings.png';
import {Routes} from "./Routes";

interface Props {
}

interface State {

}

export default class NavigationBar extends Component<Props, State> {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div style={{maxWidth:'48rem', width:'100%', backgroundColor:'#e7f6f7'}}>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img src={dostLogo} height='30' width='30' alt=""/>
            <span style={{marginLeft:'15px'}}>dOST</span>
          </a>
          <div className="SettingsBtn" style={{width:30, height:30}} onClick={this.handleSettingsBtnClick}>
            <img src={settingsLogo} height='100%' width='100%' alt=""/>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
