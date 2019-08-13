import React from 'react';
import {Box, Flex, Text} from 'rimble-ui';
import localStorage from "../services/LocalStorage";

interface Props {
  context: string;
}

interface State {

}

export default class TransactionDetails extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    let transactions = {}
    if (this.props.context === 'BURNER') {
      transactions = localStorage.getBurnerTransactions();
    } else if (this.props.context === 'BUCKET') {
      transactions = localStorage.getBucketTransactions();
    }

    console.log('----> transactions: ', transactions);

    const transactionRows = Object.keys(transactions).map((key, value) =>
      <Flex>
        <Box width={1}>
          <Flex>
            <Box width={7 / 10}>
              <Text color='##6b7c93' mx={1} my={1}>
                {key}
              </Text>
            </Box>
            <Box width={3 / 10}>
              <Text color='##6b7c93' mx={2} my={1} textAlign={'right'}>
                Status To Be Updated
              </Text>
            </Box>
          </Flex>
          <div style={{
            width: 'auto',
            height: '1px',
            backgroundColor: 'lightgray',
            marginLeft: '5px',
            marginRight: '5px'
          }}></div>
        </Box>
      </Flex>
    );

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
      <div style={{width: '100%', backgroundColor: 'white',}}>
        {transactionRows}
      </div>
    );
  }
}
