import Modal from "react-bootstrap/es/Modal";
import React, {Component} from "react";

interface Props {
  onHide?:any;
  show: boolean;
  title?: string;
}
interface State {
}
export default class ModelContainer extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  render(){

    return (
      <Modal {...this.props}>
        {this.props.children}
      </Modal>
    );
  }
}
