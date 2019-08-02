import React from 'react';
import { Blockie, EthAddress } from "rimble-ui";

export default class EthereumAccount extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
        <Blockie
          opts={{
            seed: this.props.account.address,
            color: "#dfe",
            bgcolor: "#a71",
            size: 15,
            scale: 3,
            spotcolor: "#000"
          }}
        />
        <EthAddress address={this.props.account.address} />
      </div>
    );
  }
}
