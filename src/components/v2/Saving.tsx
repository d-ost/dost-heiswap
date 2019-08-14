import React, {Component} from 'react';
import { MdLockOpen, MdLockOutline } from 'react-icons/md';
import { Row, Col, Container } from "react-bootstrap";

interface Props {

}

interface State {

}

export default class CreatePin extends Component<Props, State> {

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

    return (
      <Container className='saving'>
        <h4>Your Saving Page</h4>
        <Row className='header'>
          <Col>Token</Col>
          <Col><MdLockOpen /></Col>
          <Col><MdLockOutline /></Col>
        </Row>
        <Row>
          <Col>OST</Col>
          <Col>10</Col>
          <Col>100</Col>
        </Row>
        <Row>
          <Col>WETH</Col>
          <Col>20</Col>
          <Col>200</Col>
        </Row>
        <Row>
          <Col>DAI</Col>
          <Col>30</Col>
          <Col>300</Col>
        </Row>
        <Row>
          <Col>USDC</Col>
          <Col>40</Col>
          <Col>400</Col>
        </Row>
      </Container>
    )
  }

}
