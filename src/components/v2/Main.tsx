import React, {Component} from 'react';
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

  render() {
    return (
      <div className="Home">
        <div className="SettingsBtn">
          <IoMdSettings />
        </div>
        <div className="AccountDetailBtn">
          <MdAccountCircle />
        </div>
        <TokenBalances
          context={this.props.context}
          showBucketKeyBalances={ true }
        />
      </div>
    );
  }

}
