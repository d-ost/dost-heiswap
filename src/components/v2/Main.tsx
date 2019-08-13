import React, {Component} from 'react';
import { IoMdSettings } from 'react-icons/io';

interface Props {

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
      <div>
        <div className="SettingsBtn">
          <IoMdSettings />
        </div>
      </div>
    );
  }

}
