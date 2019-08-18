import React, {Component} from 'react';
import Form from "react-bootstrap/es/Form";
import Button from "react-bootstrap/es/Button";
import Pin from "../../viewModels/Pin";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/Col";

interface Props {
  onValidationSuccess?:any;
  onHide?:any;
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
    this.handleCancel = this.handleCancel.bind(this);
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
    } else {
      pinInstance.savePin();
      this.props.onValidationSuccess();
    }
  }
  handleCancel(e) {
    e.preventDefault();
    this.props.onHide();
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  render() {

    return (
      <div>
        <Row style={{margin:'0px',backgroundColor:'#34445b'}}>
          <div style={{fontWeight:'bolder', height: '60px', color:'white', padding: '20px'}}> Create Pin </div>
        </Row>
        <Row>
          <div style={{padding:'30px', width:'100%'}}>
            <Form>
              <Form.Group controlId="formPin">
                <Form.Label className='pin-label' style={{color:'#438cad'}}>Create your pin</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter pin"
                  required={true}
                  onChange={this.handlePinChange}
                  isInvalid={this.state.errors.pin !== 'no-error'}
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.pin !== 'no-error' && this.state.errors.pin}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formConfirmPin">
                <Form.Label className='pin-label' style={{color:'#438cad'}}>Confirm pin</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter pin"
                  required={true}
                  onChange={this.handleConfirmPinChange}
                  isInvalid={this.state.errors.confirmPin !== 'no-error'}
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.confirmPin !== 'no-error' && this.state.errors.confirmPin}
                </Form.Control.Feedback>
              </Form.Group>

              <Row style={{margin:'10px'}}>
                <Col style={{paddingRight:'1px', paddingLeft:'0px'}}>
                  <Button
                    onClick={this.handleCancel}
                    style={{
                      fontWeight:'bolder',
                      display:'inline',
                      width:'100%',
                      backgroundColor: '#34445b',
                      borderWidth:'0px',
                      color:'white',
                      height:'55px',
                      boxShadow: '0 5px 15px rgba(0,0,0,.15)',
                      borderTopLeftRadius:'15px',
                      borderTopRightRadius: '0px',
                      borderBottomRightRadius: '0px',
                      borderBottomLeftRadius: '15px',
                    }}>
                    Cancel
                  </Button>
                </Col>
                <Col style={{paddingLeft:'1px', paddingRight:'0px'}}>
                  <Button
                    onClick={this.handleSubmit}
                    style={{
                      fontWeight:'bolder',
                      display:'inline',
                      width:'100%',
                      borderWidth:'0px',
                      backgroundColor: '#34445b',
                      color:'white',
                      height:'55px',
                      boxShadow: '0 5px 15px rgba(0,0,0,.15)',
                      borderTopLeftRadius:'0px',
                      borderTopRightRadius: '15px',
                      borderBottomRightRadius: '15px',
                      borderBottomLeftRadius: '0px',
                    }}>
                    Create
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Row>
        <Row>
        </Row>
      </div>

    )

    /*
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

     */
  }

}
