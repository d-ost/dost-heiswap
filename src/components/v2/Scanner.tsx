import React, {Component} from 'react'
import QrReader from 'react-qr-reader'
import Button from "react-bootstrap/es/Button";
import Row from "react-bootstrap/es/Row";

interface Props {
  redirectURL?: string
  location?:any;
  onScan?:any;
  onHide?:any;
}

interface State {
  result: string;
}

export default class ScanQR extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      result: '',
    };
    this.onDone = this.onDone.bind(this);
  }

  handleScan = data => {
    console.log('data: ', data);
    if (data) {
      this.props.onScan(data);
    }
  };


  handleError = err => {
    console.error(err)
  };

  onDone(){
    this.props.onHide();
  }


  render() {
    return (

      <div style={{textAlign: "center"}}>
        <Row style={{margin:'0px',backgroundColor:'#34445b'}}>
          <div style={{fontWeight:'bolder', height: '60px', color:'white', padding: '20px'}}> Scan </div>
        </Row>
        <Row style={{margin:'20px'}}>
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{width: '100%'}}
          />
        </Row>
        <Row style={{margin:'20px'}}>
          <div style={{marginRight: 'auto', marginLeft: 'auto', color:'#34445b'}}>
            {this.state.result}
          </div>
        </Row>
        <Row style={{margin:'20px', color:'#438cad'}}>
          <div style={{marginRight: 'auto', marginLeft: 'auto', color:'#438cad'}}>
            Place QR code with in the box
          </div>
        </Row>
        <Row style={{margin:'20px'}}>
          <Button
            onClick={this.onDone}
            style={{
              fontWeight:'bolder',
              display:'inline',
              width:'100%',
              backgroundColor: '#34445b',
              borderWidth:'0px',
              color:'white',
              height:'55px',
              boxShadow: '0 5px 15px rgba(0,0,0,.15)',
              borderRadius:'15px',
            }}>
            Cancel
          </Button>
        </Row>

      </div>
    )
  }

  /*
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
   */
}
