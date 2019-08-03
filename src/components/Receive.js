import React from 'react';
import {Button, QR, Text} from 'rimble-ui';
import Utils from '../KeyManager/Utils'

export default class Receive extends React.Component {
  constructor(props) {
    super(props);
  }
  closeModal() {
    console.log("closeModal");
    this.props.closeModel();
  }

  render(){
    return (
      <div >
        <Button.Text
          icononly
          icon={"Close"}
          color={"moon-gray"}
          position={"absolute"}
          top={0}
          right={0}
          mt={3}
          mr={3}
          onClick={this.closeModal.bind(this)}
        />
        <QR value={this.props.account.address} />
        <Text fontWeight={'bold'}>{this.props.account.address}</Text>
      </div>
    );
  }
}
