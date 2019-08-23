import React from 'react';
import * as web3Utils from 'web3-utils';
import Header from "./Header";
import {Box, Button, Flex, Input, Text, Field} from "rimble-ui";

interface Props {
  confirmPin: string;
  changeView: Function;
  goBack: Function;
}

interface State {
  shown: boolean;
  pin: string;
  confirmPin: string;
}

export default class CreatePin extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      pin: '',
      confirmPin: ''
    };
    this.storePin = this.storePin.bind(this);
    this.confirmPinEdited = this.confirmPinEdited.bind(this);
    this.pinEdited = this.pinEdited.bind(this);
  }


  storePin() {
    if (this.validatePin() === false) {
      this.setState({shown: true});
      return;
    }
    let pinHash = this.getPinHash();
    localStorage.setItem('pin', pinHash);
    this.props.changeView('saving');
  }

  validatePin() {
    if (this.state.pin === '' || this.state.confirmPin === '') {
      return false;
    }
    return this.state.pin === this.state.confirmPin;
  }

  getPinHash() {
    let noOfTimeToHash = 3;
    let pin = this.state.pin;

    for (let i = 0; i < noOfTimeToHash; i++) {
      pin = web3Utils.keccak256(pin);
    }

    return pin;
  }

  pinEdited(e) {
    this.setState({pin: e.target.value.toString().trim()});
  }

  confirmPinEdited(e) {
    this.setState({confirmPin: e.target.value.toString().trim()});
  }

  render() {
    let shown = {
      display: this.state.shown ? "block" : "none"
    };

    let hidden = {
      display: this.state.shown ? "none" : "block"
    };


    return (

      <div style={{width: '100%', backgroundColor: 'white',}}>
        <Header
          title={'Create Pin'}
          goBack={this.props.goBack}
        />
        <Flex>
          <Box width={1}>
            <Field label="Enter PIN">
              <Input name={'pin'} type="password" required={true}
                     onChange={this.pinEdited}/>
            </Field>
          </Box>
        </Flex>
        <Flex>
          <Box width={1}>
            <Field label="Re-Enter PIN">
              <Input name={'confirmpin'} type="password" required={true}
                     onChange={this.confirmPinEdited}/>
            </Field>
          </Box>
        </Flex>
        <Flex>
          <div style={shown}>
            <Text color='red' mx={1} my={1} textAlign={'left'}>
              {'Incorrect password'}
            </Text>
          </div>
        </Flex>
        <Flex>
          <Button mainColor="#e4b030" ml={0} mt={2} minWidth='98%'
                  onClick={() => {
                    this.storePin()
                  }}>
            Lets Go!
          </Button>
        </Flex>
      </div>
    );
  }
}
