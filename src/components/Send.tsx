import React from 'react';
import Select from 'react-select';
import {Text, Input, Button, Flex, Box, QR, Field} from 'rimble-ui';
import Header from "./Header";
import BaseToken from "../KeyManager/BaseToken";

interface Props {
  goBack: Function;
  changeView: Function;
  context: string;
  token: BaseToken;
}

interface State {
  address: string;
  amount: string;
}

export default class Send extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      amount: '0',
    };
    this.addressEntered.bind(this);
    this.updateAddress.bind(this);
    this.scan = this.scan.bind(this);
    console.log('This in constructor:', this);
  }

  /*
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
  */

  updateAddress(result) {
    console.log('this', this);
    console.log('result: ', result);
    this.setState({address: result});
    console.log('state.address: ', this.state.address);
  }

  scan() {
    console.log('scan called:', this);
    this.props.goBack();
    const oThis = this;
    this.props.changeView('scanQR', (result) => {
      oThis.setState({address: result});
      console.log('result: ', result);
      console.log('oThis: ', oThis);
      oThis.updateAddress(result);
    });
  }

  send() {
    this.props.token.send(this.state.address, this.state.amount, this.props.context);

  }

  addressEntered(event) {
    console.log('this: ', this);
    console.log('AddressEntered: ', event);
    this.setState({address: event.target.value});
  }

  amountEntered(event) {
    console.log('amountEntered: ', event);
    this.setState({amount: event.target.value});
  }


  render() {
    return (
      <div style={{backgroundColor: '#ffffff'}}>
        <Header
          title={'Send'}
          goBack={this.props.goBack}
        />

        <Flex>
          <Box>
            <Field label="Send to address">
              <Input required={true}
                     onChange={this.addressEntered.bind(this)}/>
            </Field>
          </Box>
        </Flex>
        <Flex>
          <Box>
            <Text fontWeight={'bold'}>OR</Text>
          </Box>
        </Flex>
        <Flex>
          <Box>
            <Button mainColor="#e4b030" marginRight={0} minWidth={183}
                    onClick={this.scan}>
              Scan QR Code
            </Button>
          </Box>
        </Flex>
        <Flex>
          <Box>
            <Field label="Amount in wei">
              <Input required={true}
                     onChange={this.amountEntered.bind(this)}/>
            </Field>
          </Box>
        </Flex>
        <Flex>
          <Box>
            <Button mainColor="#e4b030" marginRight={0} minWidth={183}
                    onClick={() => {
                      this.send()
                    }}>
              Send
            </Button>
          </Box>
        </Flex>
      </div>
    );
  }
}
