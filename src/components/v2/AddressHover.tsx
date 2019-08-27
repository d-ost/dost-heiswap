import React, {Component} from 'react'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

interface Props {
  address: string;
}

interface State {

}

export default class AddressHover extends Component<Props, State> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }


  render() {
    return <OverlayTrigger
      trigger={[ 'hover','click']}
      placement="top"
      overlay={
        <Popover id={this.props.address}>
          <Popover.Content>
            <strong>{this.props.address}</strong>
          </Popover.Content>
        </Popover>}
    >
      <u>{this.props.address.substr(0, 10)}</u>

    </OverlayTrigger>


  }
}
