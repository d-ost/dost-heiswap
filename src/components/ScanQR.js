import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import {Box, Button, Flex, QR} from "rimble-ui";
import Header from "./Header";

export default class ScanQR extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
      this.goBack();
    }
  }
  goBack() {
    this.props.callBack(this.state.result);
    console.log('GoBack called');
    this.props.goBack();
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <Header
          title={'Scan QR'}
          goBack={this.goBack.bind(this)}
        />

        <Flex>
          <Box width={1}>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
          </Box>
        </Flex>

        <Flex>
          <Box width={1}>
            <p>{this.state.result}</p>
          </Box>
        </Flex>
      </div>
    )
  }
}
