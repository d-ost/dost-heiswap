import React, {Component} from 'react';
import Form from "react-bootstrap/es/Form";
import Button from "react-bootstrap/es/Button";
import Pin from "../../viewModels/Pin";

interface Props {

}

interface State {
  pin: string;
  confirmPin: string;
  errors: {pin: string, confirmPin: string}
}

export default class CreatePin extends Component<Props, State> {
  
  constructor(props) {
    super(props);

    this.state = {
      pin: '',
      confirmPin: '',
      errors: {pin: 'no-error', confirmPin: 'no-error'},
    };
    this.handlePinChange = this.handlePinChange.bind(this);
    this.handleConfirmPinChange = this.handleConfirmPinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePinChange(e) {
    this.setState({
        pin: e.target.value,
    });
  }

  handleConfirmPinChange(e) {
    this.setState({
      confirmPin: e.target.value,
    })
  }

  clearValidationErrors() {
    this.setState({
      errors: {pin: 'no-error', confirmPin: 'no-error'},
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.clearValidationErrors();
    const { pin, confirmPin } = this.state;
    const pinInstance = new Pin(pin);
    const errors = pinInstance.validatePinCreation(confirmPin);

    if (errors.pin !== 'no-error' || errors.confirmPin !== 'no-error') {
      this.setState({
        errors: errors,
      });
    }
    pinInstance.savePin();
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }


  render() {

    return (
      <div className='CreatePin'>
        <Form>
          <Form.Group controlId="formPin">
            <Form.Label className='pin-label'>Create your Pin</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your Pin"
              required={true}
              onChange={this.handlePinChange}
              isInvalid={this.state.errors.pin !== 'no-error'}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.pin !== 'no-error' && this.state.errors.pin}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formConfirmPin">
            <Form.Label className='pin-label'>Confirm Pin</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your Pin"
              required={true}
              onChange={this.handleConfirmPinChange}
              isInvalid={this.state.errors.confirmPin !== 'no-error'}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.confirmPin !== 'no-error' && this.state.errors.confirmPin}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" onClick={this.handleSubmit}>
            Create Pin
          </Button>
        </Form>
      </div>
    )
  }

}
