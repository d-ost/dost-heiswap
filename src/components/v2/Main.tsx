import React, {Component} from 'react';
import { Redirect } from 'react-router';
import Button from "react-bootstrap/es/Button";
import { IoMdSettings } from 'react-icons/io';
import { MdAccountCircle } from 'react-icons/md';
import TokenBalances from './TokenBalances';

interface Props {
  context: string
}

interface State {

}

export default class Main extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {}
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
    return <Redirect to='/setting' />
  }

  handleAccountDetailBtnClick(e) {
    e.preventDefault();
    console.log('redirecting to create-pin page');
    return <Redirect to='/create-pin' />
  }

  render() {
    return (
      <div className="Home">
        <div className="SettingsBtn" onClick={this.handleSettingsBtnClick}>
          <IoMdSettings />
        </div>
        <div className="AccountDetailBtn" onClick={this.handleAccountDetailBtnClick}>
          <MdAccountCircle />
        </div>
        <TokenBalances
          context={this.props.context}
          showBucketKeyBalances={ false }
        />
        <Button variant="light">Receive</Button>
      </div>
    );
  }

}
