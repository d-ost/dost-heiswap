import React from 'react';
import * as web3Utils from 'web3-utils';
import Header from "./Header";
import {Box, Button, Field, Flex, Input, Text} from "rimble-ui";

const HASHNUMBER = 3;

export default class VerifyPin extends React.Component {
  constructor(props) {
    super(props);
    this.pin = '';
    this.state = {shown:false};
    this.pinEdited = this.pinEdited.bind(this);
    this.verifyPin = this.verifyPin.bind(this);
    this.pinEntered = this.pinEntered.bind(this);
  }

  verifyPin() {
    console.log('in verify pin');
    if (this.pin === '') {
      return false
    }
    let generatedPinHash = this.getPinHash();
    let localStoragePin =  localStorage.getItem('pin', generatedPinHash);
    return localStoragePin === generatedPinHash;
  }

  pinEntered() {
    if (this.verifyPin()){
      this.props.goBack();
      this.props.changeView('saving');
      return;
    }
    this.setState({shown: true});
  }

  getPinHash() {
    let pin = this.pin;
    for(let i = 0;i < HASHNUMBER; i++){
      pin = web3Utils.keccak256(pin);
    }
    return pin;
  }

  pinEdited(event) {
    this.pin = event.target.value;
  }

  render(){
    let shown = {
      display: this.state.shown ? "block" : "none"
    };

    console.log('shown: ', this.state );
    return (
      <div style={{width: '100%', backgroundColor: 'white',}} >
        <Header
          title={'Create Pin'}
          goBack={this.props.goBack}
        />
        <Flex>
          <Box width={1}>
            <Field label="Enter PIN">
              <Input name={'pin'} type="password" required={true} onChange={this.pinEdited} />
            </Field>
          </Box>
        </Flex>
        <Flex>
          <div style={ shown }>
            <Text color='red' mx={1} my={1} textAlign={'left'}>
              {'Incorrect password'}
            </Text>
          </div>
        </Flex>
        <Flex>
          <Button mainColor="#e4b030" ml={0} mt={2}  minWidth='98%' onClick={()=>{this.pinEntered()}}>
            Lets Go!
          </Button>
        </Flex>
      </div>
    );
  }
}
