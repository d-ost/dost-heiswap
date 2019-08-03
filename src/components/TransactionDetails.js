import React from 'react';
import {Box, Button, Card, Flex, Text} from 'rimble-ui';
import Utils from '../KeyManager/Utils'

export default class TransactionDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div style={{width: '100%', backgroundColor: 'white',}} >
        <Flex>
          <Box width={1}>
            <Flex>
              <Box width={7/10}>
                <Text color='##6b7c93' mx={1} my={1}>
                  Transaction Hash
                </Text>
              </Box>
              <Box width={3/10}>
                <Text color='##6b7c93' mx={2} my={1} textAlign={'right'}>
                  Status
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
        <Flex>
          <Box width={1}>
            <Flex>
              <Box width={7/10}>
                <Text color='##6b7c93' mx={1} my={1}>
                  Transaction Hash
                </Text>
              </Box>
              <Box width={3/10}>
                <Text color='##6b7c93' mx={2} my={1} textAlign={'right'}>
                  Status
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
        <Flex>
          <Box width={1}>
            <Flex>
              <Box width={7/10}>
                <Text color='##6b7c93' mx={1} my={1}>
                  Transaction Hash
                </Text>
              </Box>
              <Box width={3/10}>
                <Text color='##6b7c93' mx={2} my={1} textAlign={'right'}>
                  Status
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
      </div>

    );
  }
}
