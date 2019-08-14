import React from 'react';
import Container from "react-bootstrap/es/Container";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Utils from '../../KeyManager/Utils'
import Token from "../../viewModels/Token";

interface Props {
  token: Token;
  context: string;
}

interface State {
  balance: string;
}

export default class TokenBalance extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      balance: '0'
    }
  }

  componentWillMount(): void {
    // this.setState({balance: this.props.token.totalBalances[this.props.context]});
  }

  render() {
    const imageName = Utils.getImagePathForSymbol(this.props.token.symbol);
    const image = require(`../../images/${imageName}`);
    return (
      <Container>
        <Row>
          <Col xs={6} md={4}>
            {/*<Image src={image} rounded />*/}
          </Col>
          <Col xs={6} md={4}>
            {this.props.token.symbol}
          </Col>
          <Col xs={6} md={4}>
            {this.state.balance}
          </Col>
        </Row>
      </Container>
    );
  }
}
