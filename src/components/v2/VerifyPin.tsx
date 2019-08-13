import React, {Component} from 'react';
import Form from "react-bootstrap/es/Form";
import Button from "react-bootstrap/es/Button";

interface Props {

}

interface State {

}

export default class VerifyPin extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {}
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
            <Form.Control type="password" placeholder="Enter your Pin" minLength={6} required={true}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Verify Pin
          </Button>
        </Form>
      </div>
    )
  }

}
