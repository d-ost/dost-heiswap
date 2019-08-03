import React from 'react';
import {Box, Button, Card, Flex} from 'rimble-ui';
import Utils from '../KeyManager/Utils'

export default class BurnerAction extends React.Component {
  constructor(props) {
    super(props);
  }
  sendClicked() {
    this.props.openModal();
    this.props.changeView('send');
  }
  receiveClicked() {
    this.props.openModal();
    this.props.changeView('receive');
  }

  render(){
    return (
      <div style={{width: '100%'}} >
        <Flex>
          <Box width={1/2}>
            <Button mainColor="#e4b030" ml={0} mt={2}  minWidth='98%' onClick={()=>{this.sendClicked()}}>
              Send
            </Button>
          </Box>
          <Box width={1/2}>
            <Button mainColor="#e4b030" ml={1} mt={2}  minWidth='98%' onClick={()=>{this.receiveClicked()}}>
              Receive
            </Button>
          </Box>
        </Flex>
      </div>
    );
  }
}
