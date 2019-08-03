import React from 'react';
import {Box, Button, Card, Flex} from 'rimble-ui';
import Utils from '../KeyManager/Utils'
import Header from "./Header";
import TokenBalance from "./TokenBalance";
import SavingAction from "./SavingAction";
import Transactions from "./Transactions";

export default class Saving extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
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
                account={this.props.account}
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
                changeView={this.props.changeView}
                openModal={this.props.openModal}
              />
            </Box>
          </Flex>
        </div>
      </div>
    );
  }
}
