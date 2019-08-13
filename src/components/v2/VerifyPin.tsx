import React, {Component} from 'react';
import Form from "react-bootstrap/es/Form";
import Button from "react-bootstrap/es/Button";

interface Props {

}

interface State {
  pin: string,
  errors: {pin: string},
}

export default class VerifyPin extends Component<Props, State> {

  PIN_MINIMUM_LENGTH = 6;

  constructor(props) {
    super(props);

    this.state = {
      pin: '',
      errors: {pin: 'false'},
    };
    this.handlePinChange = this.handlePinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePinChange(e) {
    this.setState({
      pin: e.target.value,
    });
  }

  clearValidationErrors() {
    this.setState({
      errors: {pin: 'false'},
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
  }

  handleSubmit(e) {
    e.preventDefault();
    this.clearValidationErrors();
    this.validatePin();
    const { pin } = this.state;
    // Return if errors else store the pin
    console.log(`pin: ${pin}`);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  render() {

    return (
      <div className='VerifyPin'>
        <Form>
          <Form.Group controlId="formPin">
            <Form.Label>Enter your Pin for Verification</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your Pin"
              minLength={6}
              required={true}
              onChange={this.handlePinChange}
              isInvalid={this.state.errors.pin !== 'false'}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.pin !== 'false' && this.state.errors.pin}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" onClick={this.handleSubmit}>
            Verify Pin
          </Button>
        </Form>
      </div>
    )
  }

}
