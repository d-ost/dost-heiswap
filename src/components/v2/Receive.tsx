import React, {Component} from 'react'
import { QR } from 'rimble-ui';
import Row from "react-bootstrap/es/Row";
import Button from "react-bootstrap/es/Button";

interface Props {
  address:string;
  onHide?:any;
}

interface State {

}

export default class Receive extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.onDone = this.onDone.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  onDone(){
    this.props.onHide();
  }

  render() {
    return (

      <div style={{textAlign: "center"}}>
        <Row style={{margin:'0px',backgroundColor:'#34445b'}}>
          <div style={{fontWeight:'bolder', height: '60px', color:'white', padding: '20px'}}> Receive </div>
        </Row>
        <Row style={{margin:'20px'}}>
          <QR style={{width: '70%', height: 'auto', marginRight: 'auto', marginLeft: 'auto'}} value={this.props.address}/>
        </Row>
        <Row style={{margin:'20px'}}>
          <div style={{marginRight: 'auto', marginLeft: 'auto', color:'#34445b'}}>
            {this.props.address}
          </div>
        </Row>
        <Row style={{margin:'20px', color:'#438cad'}}>
          <div style={{marginRight: 'auto', marginLeft: 'auto', color:'#438cad'}}>
            Scan this QR code to receive the tokens.
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
            Done
          </Button>
        </Row>

      </div>
    )
  }

}
