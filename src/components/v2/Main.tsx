import React, {Component} from 'react';
import ListGroup from "react-bootstrap/es/ListGroup";
import { IoMdSettings } from 'react-icons/io';
import { MdAccountCircle } from 'react-icons/md';
import TokenBalance from './TokenBalance';
import Token from "../../viewModels/Token";

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
    const elements = Token.getAll();
    return (
      <div>
        <div className="SettingsBtn">
          <IoMdSettings />
        </div>
        <div className="AccountDetailBtn">
          <MdAccountCircle />
        </div>
        <ListGroup className="BalanceCards">
          {elements.map((value, index) => {
            return <TokenBalance
              context={this.props.context}
              token={value}
            />
          })}
        </ListGroup>
      </div>
    );
  }

}
