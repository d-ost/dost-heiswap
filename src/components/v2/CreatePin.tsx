import React, {Component} from 'react';
import Form from "react-bootstrap/es/Form";
import Button from "react-bootstrap/es/Button";

interface Props {

}

interface State {
  pin: string;
  confirmPin: string;
  errors: {pin: string, confirmPin: string}
}

export default class CreatePin extends Component<Props, State> {
  
  PIN_MINIMUM_LENGTH = 6;
  
  constructor(props) {
    super(props);

    this.state = {
      pin: '',
      confirmPin: '',
      errors: {pin: 'false', confirmPin: 'false'},
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
      errors: {pin: 'false', confirmPin: 'false'},
    });
  }

  validatePin() {
    console.log('validating pin...');
    if(this.state.pin.length < this.PIN_MINIMUM_LENGTH) {
      let errors = this.state.errors;
      errors.pin = `Pin length should be greater or equal to ${this.PIN_MINIMUM_LENGTH}`;
      this.setState({
        errors: errors,
      });
    }

    if(this.state.confirmPin.length < this.PIN_MINIMUM_LENGTH){
      let errors = this.state.errors;
      errors.confirmPin = `Pin length should be greater or equal to ${this.PIN_MINIMUM_LENGTH}`;
      this.setState({
        errors: errors,
      });
    }

    if (this.state.pin !== this.state.confirmPin) {
      let errors = this.state.errors;
      errors.confirmPin = 'Pin mismatch!!!';
      this.setState({
        errors: errors,
      });
    }

  }

  handleSubmit(e) {
    e.preventDefault();
    this.clearValidationErrors();

    const { pin, confirmPin } = this.state;
    this.validatePin();
    // Return if errors else store the pin
    console.log(`pin: ${pin}, confirm pin: ${confirmPin}`);
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
              minLength={this.PIN_MINIMUM_LENGTH}
              required={true}
              onChange={this.handlePinChange}
              isInvalid={this.state.errors.pin !== 'false'}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.pin !== 'false' && this.state.errors.pin}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formConfirmPin">
            <Form.Label className='pin-label'>Confirm Pin</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your Pin"
              minLength={this.PIN_MINIMUM_LENGTH}
              required={true}
              onChange={this.handleConfirmPinChange}
              isInvalid={this.state.errors.confirmPin !== 'false'}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.confirmPin !== 'false' && this.state.errors.confirmPin}
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
