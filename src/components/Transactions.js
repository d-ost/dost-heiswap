import React from 'react';
import {Box, Button, Card, Flex, Text} from 'rimble-ui';
import Utils from '../KeyManager/Utils'
import TransactionDetails from './TransactionDetails'

export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div style={{width: '100%', backgroundColor: 'white',}} >
        <Flex>
          <Box width={1}>
            <Text fontWeight={1000} color='#84d1d4' mx={1} my={1}>
              Recent Transactions
            </Text>
            <div style={{
              width: 'auto',
              height:'1px',
              backgroundColor: 'gray',
              marginLeft: '5px',
              marginRight: '5px'
            }}></div>
          </Box>
        </Flex>

        <Flex>
          <TransactionDetails
            context={this.props.context}
          />
        </Flex>

      </div>
    );
  }
}
