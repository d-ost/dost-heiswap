import React, {Component} from 'react';
import Form from "react-bootstrap/es/Form";
import Button from "react-bootstrap/es/Button";

interface Props {

}

interface State {

}

export default class Send extends Component<Props, State> {
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
      <div className='CreatePin'>
        <Form>
          <Form.Group controlId="formPin">
            <Form.Label>Create your Pin</Form.Label>
            <Form.Control type="password" placeholder="Enter 6 digit Pin" maxLength={6} required={true}/>
          </Form.Group>

          <Form.Group controlId="formConfirmPin">
            <Form.Label>Confirm Pin</Form.Label>
            <Form.Control type="password" placeholder="Confirm your Pin" maxLength={6} required={true}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Pin
          </Button>
        </Form>
      </div>
    )
  }

}
