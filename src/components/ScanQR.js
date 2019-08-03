import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import {Button} from "rimble-ui";

export default class ScanQR extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  goBack() {
    console.log('GoBack called');
    this.props.goBack();
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
        <Button.Text
          icononly
          icon={"Close"}
          color={"moon-gray"}
          position={"absolute"}
          top={0}
          right={0}
          mt={3}
          mr={3}
          onClick={this.goBack.bind(this)}
        />
      </div>
    )
  }
}
