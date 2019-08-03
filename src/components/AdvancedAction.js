import React from 'react';
import {Box, Button, Card, Flex} from 'rimble-ui';
import Utils from '../KeyManager/Utils'

export default class AdvancedAction extends React.Component {
  constructor(props) {
    super(props);
  }

  topUpClicked() {
    console.log('topUpClicked');
    this.props.openModal();
    this.props.changeView('pin');
  }

  advancedClicked() {
    console.log('advancedClicked');
    this.props.changeView('advance');
  }


  render(){
    return (
      <div style={{width: '100%'}}>
        <Flex>
          <Box width={1/2}>
            <Button mainColor="#e4b030" ml={0} mt={2} minWidth='98%' onClick={()=>{this.topUpClicked()}}>
              Top up
            </Button>
          </Box>
          <Box width={1/2} >
            <Button mainColor="#e4b030" mt={2} ml={1} minWidth='98%' onClick={()=>{this.advancedClicked()}}>
              Advanced
            </Button>
          </Box>
        </Flex>
      </div>
    );
  }
}
