import React from 'react';
import Select from 'react-select';
import {Text, Input, Button} from 'rimble-ui';

export default class BurnerAction extends React.Component {
  constructor(props) {
    super(props);
    this.options = [];
    this.props.tokens.forEach((token,index)=>{
      this.options.push({ value: token.address, label: `${token.symbol} - ${token.balance}`});
    });
    this.selectedOption = this.options[0].address;
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
  render(){

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

        <Button mainColor="#e4b030" marginRight={0} minWidth={183}>
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
