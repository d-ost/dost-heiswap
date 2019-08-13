import React from 'react';
import {Box, Card, Flex} from 'rimble-ui';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Props {
  openModal: Function;
  changeView: Function;
}

interface State {

}

export default class AdvancedAction extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  topUpClicked() {
    console.log('topUpClicked');
    this.props.openModal();
    this.props.changeView('pin');
  }

  advancedClicked() {
    console.log('advancedClicked');
    this.props.changeView('advance');
  }


  render() {
    return (

      <Container>
        <Row>
          <Col xs={6}>
            <Button onClick={() => {
              this.topUpClicked()
            }}>
              Top up
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              variant={"primary"}
              onClick={() => {
                this.advancedClicked()
              }}>
              Advanced
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
