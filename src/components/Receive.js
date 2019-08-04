import React from 'react';
import {Box, Button, Field, Flex, Input, QR, Text} from 'rimble-ui';
import Utils from '../KeyManager/Utils'
import Account from "../KeyManager/Account";
import Header from "./Header";

export default class Receive extends React.Component {
  constructor(props) {
    super(props);
    this.account = Account.createNewBurnerKey();
  }
  closeModal() {
    console.log("closeModal");
    this.props.closeModel();
  }

  render(){
    return (
      <div >
        <Header
          title={'Receive'}
          goBack={this.props.goBack}
        />

        <Flex>
          <Box width={1} mt={5} mb={5}>
            <div style={{textAlign: "center"}}>
              <QR value={this.account.address} />
            </div>

          </Box>
        </Flex>
        <Flex>
          <Box width={1} mb={5}>
            <Text fontWeight={'bold'} color='#ffffff' textAlign={'center'} >{this.account.address}</Text>
          </Box>
        </Flex>
      </div>
    );
  }
}
