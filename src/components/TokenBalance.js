import React from 'react';
import { Avatar, Text } from 'rimble-ui';
import Utils from '../KeyManager/Utils'

export default class TokenBalance extends React.Component {
  constructor(props) {
    super(props);
    this.balance = '0';
  }
  render(){
    console.log('token: ', this.props.token);
    const imageName = Utils.getImagePathForSymbol(this.props.token.symbol);
    console.log('imageName: ', imageName);
    const image = require(`../images/${imageName}`);
    console.log('image: ', image);
    this.balance = this.props.token.balances[this.props.account.address] || '0';
    return (
      <div className='BalanceCard'>
        <div className='Icon'>
          <Avatar
            size="60px"
            src={image}
          />
        </div>
        <div className='Symbol'>
          <Text.p>{this.props.token.symbol}</Text.p>
        </div>
        <div className='Balance'>
          <Text.p textAlign={'right'}>{this.balance}</Text.p>
        </div>

      </div>
    );
  }
}
