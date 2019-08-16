import React, {Component} from 'react';
import Form from "react-bootstrap/es/Form";
import Button from "react-bootstrap/es/Button";
import Pin from "../../viewModels/Pin";
import {Routes} from "./Routes";

interface Props {
  onValidationSuccess?: any;
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
      errors: {pin: 'no-error'},
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
      errors: {pin: 'no-error'},
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.clearValidationErrors();

    const { pin } = this.state;
    const pinInstance = new Pin(pin);
    const errors = pinInstance.verifyPin();
    if( errors.pin !== 'no-error') {
      this.setState({
        errors: errors,
      });
    } else {
      console.log(`pin verified!!!`);
      this.props.onValidationSuccess();
    }

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
              isInvalid={this.state.errors.pin !== 'no-error'}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.pin !== 'no-error' && this.state.errors.pin}
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
