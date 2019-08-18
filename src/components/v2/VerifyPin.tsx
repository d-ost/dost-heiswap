import React, {Component} from 'react';
import Form from "react-bootstrap/es/Form";
import Button from "react-bootstrap/es/Button";
import Pin from "../../viewModels/Pin";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/Col";

interface Props {
  onValidationSuccess?: any;
  onHide?:any;
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
    this.handleCancel = this.handleCancel.bind(this);
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
          <div style={{fontWeight:'bolder', height: '60px', color:'white', padding: '20px'}}> Verify Pin </div>
        </Row>
        <Row>
          <div style={{padding:'30px', width:'100%'}}>
            <Form>
              <Form.Group controlId="formPin">
                <Form.Label style={{color:'#438cad'}}>Enter your pin to continue</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your Pin"
                  minLength={this.PIN_MINIMUM_LENGTH}
                  required={true}
                  onChange={this.handlePinChange}
                  isInvalid={this.state.errors.pin !== 'no-error'}
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.pin !== 'no-error' && this.state.errors.pin}
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
                    Verify
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
  }

}
