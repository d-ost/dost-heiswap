import React from 'react';
import {Box, Button, Card, Flex, Text} from 'rimble-ui';
import Utils from '../KeyManager/Utils'
import {LocalStorage} from "../services/LocalStorage";

export default class TransactionDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const transactionRows = []
    let transactions = {}
    if (this.props.context === 'BURNER') {
      transactions = LocalStorage.getBurnerTransactions();
    } else if (this.props.context === 'BUCKET') {
      transactions = LocalStorage.getBucketTransactions();
    }

    console.log('----> transactions: ', transactions);

    Object.keys(transactions).forEach((key, value) => {
      transactionRows.push(
        <Flex>
          <Box width={1}>
            <Flex>
              <Box width={7/10}>
                <Text color='##6b7c93' mx={1} my={1}>
                  {key}
                </Text>
              </Box>
              <Box width={3/10}>
                <Text color='##6b7c93' mx={2} my={1} textAlign={'right'}>
                  Status To Be Updated
                </Text>
              </Box>
            </Flex>
            <div style={{
              width: 'auto',
              height:'1px',
              backgroundColor: 'lightgray',
              marginLeft: '5px',
              marginRight: '5px'
            }}></div>
          </Box>
        </Flex>
      );
    });

    if (transactionRows.length === 0) {
      transactionRows.push(
        <Flex>
          <Box width={1}>
            <Text>
              No Transactions available.
            </Text>
          </Box>
        </Flex>
      );
    }
    return (
      <div style={{width: '100%', backgroundColor: 'white',}} >
        { transactionRows }
      </div>
    );
  }
}
