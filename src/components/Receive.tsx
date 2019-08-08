import React from 'react';
import {Box, Flex, QR, Text} from 'rimble-ui';
import Header from "./Header";
import {Account as AccountHelper} from "../KeyManager/Account";
import {Account} from 'web3-eth-accounts';

interface Props {
  closeModel: Function;
  goBack: Function;
}

interface State {
  account: Account;
}

export default class Receive extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      account: AccountHelper.createNewBurnerKey()
    }
  }

  closeModal() {
    console.log("closeModal");
    this.props.closeModel();
  }

  render() {
    return (
      <div>
        <Header
          title={'Receive'}
          goBack={this.props.goBack}
        />

        <Flex>
          <Box width={1} mt={5} mb={5}>
            <div style={{textAlign: "center"}}>
              <QR value={this.state.account.address}/>
            </div>

          </Box>
        </Flex>
        <Flex>
          <Box width={1} mb={5}>
            <Text fontWeight={'bold'} color='#ffffff'
                  textAlign={'center'}>{this.state.account.address}</Text>
          </Box>
        </Flex>
      </div>
    );
  }
}
