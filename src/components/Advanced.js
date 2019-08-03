import React from 'react';
import {Box, Button, Card, Flex, Text} from 'rimble-ui';
import Utils from '../KeyManager/Utils'
import Header from "./Header";

export default class Advanced extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div style={{width: '100%', backgroundColor: 'white',}} >
        <Header
          goBack={this.props.goBack}
        />
        <Flex>
          <Box width={1}>
            <Flex>
              <Box width={7/10}>
                <Text color='##6b7c93' mx={1} my={1}>
                  Account address
                </Text>
              </Box>
              <Box width={3/10}>
                <Text color='##6b7c93' mx={2} my={1} textAlign={'right'}>
                  100000000
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
                  Account address
                </Text>
              </Box>
              <Box width={3/10}>
                <Text color='##6b7c93' mx={2} my={1} textAlign={'right'}>
                  233
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
