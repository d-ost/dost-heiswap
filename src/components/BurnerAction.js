import React from 'react';
import { Button } from 'rimble-ui';
import Utils from '../KeyManager/Utils'

export default class BurnerAction extends React.Component {
  constructor(props) {
    super(props);
  }
  sendClicked() {
    console.log('sendClicked');
    this.props.openModal();
    this.props.changeView('send');
  }
  receiveClicked() {
    console.log('sendClicked');
    this.props.openModal();
    this.props.changeView('receive');
  }
  topUpClicked() {
    console.log('topUpClicked');
    this.props.openModal();
    this.props.changeView('saving');
  }

  render(){
    return (
      <div className='Action'>
        <div style={{width:'100%', display: 'inlineBlock'}}>
          <Button mainColor="#e4b030" marginRight={3} minWidth={183} onClick={()=>{this.sendClicked()}}>
            Send
          </Button>
          <Button mainColor="#e4b030" marginRight={0} minWidth={183} onClick={()=>{this.receiveClicked()}}>
            Receive
          </Button>
        </div>
        <div style={{paddingTop:'10px', width:'100%'}}>
          <Button mainColor="#e4b030" marginRight={3} minWidth={183} onClick={()=>{this.topUpClicked()}}>
            Top up
          </Button>
          <Button mainColor="#e4b030" marginRight={0} minWidth={183}>
            Deposit
          </Button>
        </div>
      </div>
    );
  }
}
