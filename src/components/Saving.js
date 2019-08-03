import React from 'react';
import {Box, Button, Card, Flex} from 'rimble-ui';
import Utils from '../KeyManager/Utils'
import Header from "./Header";
import TokenBalance from "./TokenBalance";
import SavingAction from "./SavingAction";

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
                token={this.props.token}
                account={this.props.account}
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
