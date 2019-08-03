import React from 'react';
import Select from 'react-select';
import {Text, Input, Button} from 'rimble-ui';

export default class BurnerAction extends React.Component {
  constructor(props) {
    super(props);
    this.options = [];
    this.account = this.props.account;
    this.selectedOption = 0;
    this.options = this.getLatestBalance();
  }

  getLatestBalance() {
    const options = [];
    this.props.tokens.forEach((token,index)=>{
      options.push({ value: index, label: `${token.symbol} - ${token.balances[this.account.address]}`});
    });
    options.push({value: options.length, label: `${this.props.baseToken.symbol} - ${this.props.baseToken.balances[this.account.address]}`});
    return options;
  }
  sendClicked() {
    console.log('sendClicked');
    this.props.changeView('send');
  }
  handleChange() {
    console.log("HandleChange");
  }
  closeModal() {
    console.log("closeModal");
    this.props.closeModel();
  }
  scan() {
    console.log("closeModal");
    this.props.changeView('scanQR');
  }
  render(){
    this.options = this.getLatestBalance();
    console.log('this.tokenSymbols: ', this.tokenSymbols);
    return (
      <div className='Send' >
        <Button.Text
          icononly
          icon={"Close"}
          color={"moon-gray"}
          position={"absolute"}
          top={0}
          right={0}
          mt={3}
          mr={3}
          onClick={this.closeModal.bind(this)}
        />

        <Text fontWeight={'bold'}>Send to Address</Text>
        <Select
          value={this.selectedOption}
          onChange={this.handleChange.bind(this)}
          options={this.options}
        />

        <Text fontWeight={'bold'}>To address</Text>
        <Input
          type="text"
          required={true}
          placeholder="e.g. 0xAc03BB73b6a9e108530AFf4Df5077c2B3D481e5A"
        />
        <Text fontWeight={'bold'}>OR</Text>

        <Button mainColor="#e4b030" marginRight={0} minWidth={183} onClick={this.scan.bind(this)}>
          Scan QR Code
        </Button>

        <Text fontWeight={'bold'}>Send Amount</Text>
        <Input
          type="text"
          required={true}
          placeholder="In wei"
        />

        <Button mainColor="#e4b030" marginRight={0} minWidth={183}>
          Send
        </Button>
      </div>
    );
  }
}
