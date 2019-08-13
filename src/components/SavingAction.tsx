import React from 'react';
import {Box, Button, Card, Flex} from 'rimble-ui';
import Utils from '../KeyManager/Utils'

interface Props {

}

interface State {

}

export default class SavingAction extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.withdrawClicked.bind(this);
    this.addBucketClicked.bind(this);
  }

  withdrawClicked() {
    console.log('withdrawClicked');
  }

  addBucketClicked() {
    console.log('addBucketClicked');
  }
  render(){
    return (
      <div style={{width: '100%'}}>
        <Flex>
          <Box width={1/2}>
            <Button mainColor="#e4b030" ml={0} mt={2} minWidth='98%' onClick={()=>{this.withdrawClicked()}}>
              Withdraw
            </Button>
          </Box>
          <Box width={1/2} >
            <Button mainColor="#e4b030" mt={2} ml={1} minWidth='98%' onClick={()=>{this.addBucketClicked()}}>
              Add Bucket
            </Button>
          </Box>
        </Flex>
      </div>
    );
  }
}
