import React from 'react';
import { Avatar, Text , Flex, Box} from 'rimble-ui';
import Utils from '../KeyManager/Utils'

export default class TokenBalance extends React.Component {
  constructor(props) {
    super(props);
    this.balance = '0';
  }
  render(){
    const imageName = Utils.getImagePathForSymbol(this.props.token.symbol);
    const image = require(`../images/${imageName}`);
    this.balance = this.props.token.totalBalances[this.props.context];
    return (
      <div className='BalanceCard'>
        <Flex>
          <Box p={0} m={0} width={2/10}>
            <Avatar
              size="50px"
              src={image}
            />
          </Box>
          <Box pt={3} m={0} width={2/10}>
            <Text.p color='#438bad' fontWeight='400' textAlign='left'>{this.props.token.symbol}</Text.p>
          </Box>
          <Box pt={3} pr={3} m={0} width={8/10} >
            <Text.p textAlign='right' >{this.balance} </Text.p>
          </Box>
        </Flex>

      </div>
    );
  }
}
