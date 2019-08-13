import React from 'react';
import {Box, Button, Flex, Text} from 'rimble-ui';
import Header from "./Header";
import {Account} from "../KeyManager/Account";
import BaseToken from "../KeyManager/BaseToken";

interface Props {
  title: string;
  goBack: Function;
  token: BaseToken;
}

interface State {

}

export default class Advanced extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    const addresses = Account.getBurnerAddresses();
    const accountDetails = addresses.map((address) =>
      <Flex>
        <Box width={1}>
          <Flex>
            <Box width={7 / 10}>
              <Text fontSize={'12px'} color='##6b7c93' mx={1} my={1}>
                {address}
              </Text>
            </Box>
            <Box width={3 / 10}>
              <Text fontWeight={'bold'} fontSize={'12px'} color='##6b7c93'
                    mx={2} my={1} textAlign={'right'}>
                {this.props.token.balances[address]}
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

    return (
      <div style={{width: '100%', backgroundColor: 'white',}}>
        <Header
          title={this.props.title}
          goBack={this.props.goBack}
        />
        {accountDetails}
      </div>

    );
  }
}
