import React from 'react';
import Table from "react-bootstrap/es/Table";
import Token from "../../viewModels/Token";
import TokenBalance from "./TokenBalance"

interface Props {
  context: string;
  showBucketKeyBalances: boolean;
}

interface State {

}

export default class TokenBalances extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount(): void {}

  render() {
    const tokens = Token.getAll();
    return (
      <div style={{backgroundColor:'white'}}>
        <Table className="TokenBalances" responsive borderless striped hover size="md">
          <thead>
          <tr>
            <th>Token</th>
            <th>Balance</th>
            <th hidden={!this.props.showBucketKeyBalances}>Bucket Key(s) Balance</th>
          </tr>
          </thead>
          <tbody>
          {tokens.map((value, index) => {
            return <TokenBalance
              context={this.props.context}
              token={value}
              showBucketKeyBalances={this.props.showBucketKeyBalances}
            />
          })}
          </tbody>
        </Table>
      </div>
    );
  }
}
