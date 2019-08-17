import React, {Component} from 'react'
import QrReader from 'react-qr-reader'
import {Box, Button, Flex, QR} from "rimble-ui";
import {Redirect} from 'react-router'
import queryString from 'query-string'

interface Props {
  redirectURL?: string
  location?:any;
  onScan?:any;
}

interface State {
  result: string;
}

export default class ScanQR extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      result: '',
    }
  }

  handleScan = data => {
    console.log('data: ', data);
    if (data) {
      // this.setState({
      //   result: data
      // });
      this.props.onScan(data);
    }
  };


  handleError = err => {
    console.error(err)
  };

  render(){
    return (
      <div>
        <Flex>
          <Box width={1}>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{width: '100%'}}
            />
          </Box>
        </Flex>

        <Flex>
          <Box width={1}>
            <p>{this.state.result}</p>
          </Box>
        </Flex>
      </div>
    );
  }

  /*
  render() {
    const values = queryString.parse(this.props.location.search);
    const redirectURL = values.redirectURL;
    const key = values.key
    console.log('redirectURL  ',redirectURL);
    return (
      this.state.result.length > 0 ?
        <Redirect from='/scanner' to={`${redirectURL}?${key}=${this.state.result}`}/>
      :<div>
        <Flex>
          <Box width={1}>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{width: '100%'}}
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

   */
}
