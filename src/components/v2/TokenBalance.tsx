import React from 'react';
import Utils from '../../KeyManager/Utils'
import Token from "../../viewModels/Token";

interface Props {
  context: string;
  token: Token;
  showBucketKeyBalances: boolean;
}

interface State {
  burnerKeysTotalBalance: string;
  bucketKeysTotalBalance: string
}

export default class TokenBalance extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      burnerKeysTotalBalance: '0',
      bucketKeysTotalBalance: '0'
    }
  }

  componentWillMount(): void {
    // this.setState({balance: this.props.token.totalBalances[this.props.context]});
  }

  render() {
    const imageName = Utils.getImagePathForSymbol(this.props.token.symbol);
    const image = require(`../../images/${imageName}`);
    return (
      <tr>
        <td>{this.props.token.symbol}</td>
        <td>{this.state.burnerKeysTotalBalance}</td>
        <td hidden={!this.props.showBucketKeyBalances}>{this.state.bucketKeysTotalBalance}</td>
      </tr>
    );
  }
}
