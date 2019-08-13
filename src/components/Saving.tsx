import React from 'react';
import {Box, Button, Card, Flex} from 'rimble-ui';
import Header from "./Header";
import TokenBalance from "./TokenBalance";
import SavingAction from "./SavingAction";
import Transactions from "./Transactions";
import BaseToken from "../KeyManager/BaseToken";

interface Props {
  goBack: Function;
  token: BaseToken;
  changeView: Function;
  openModal: Function;
  context: string;
}

interface State {

}

export default class Saving extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Header
          title={'Your Savings'}
          goBack={this.props.goBack}
        />
        <div className="Card">
          <Flex>
            <Box width={1}>
              <TokenBalance
                context={this.props.context}
                token={this.props.token}
              />
            </Box>
          </Flex>
          <Flex>
            <Box width={1} mt={2} mb={2}>
              <Transactions
                context={"BUCKET"}
              />
            </Box>
          </Flex>
          <Flex>
            <Box width={1}>
              <SavingAction
              />
            </Box>
          </Flex>
        </div>
      </div>
    );
  }
}
