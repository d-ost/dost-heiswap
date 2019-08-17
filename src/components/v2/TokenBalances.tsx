import React from 'react';
import Table from "react-bootstrap/es/Table";
import Token from "../../viewModels/Token";
import TokenBalance from "./TokenBalance"
import Container from "react-bootstrap/es/Container";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";

interface Props {
  context: string;
  showBucketKeyBalances: boolean;
  onClick: any;
}

interface State {

}

export default class TokenBalances extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount(): void {}

  render() {
    const tokens = Token.getAll();
    return (
      <div style={{backgroundColor:'white'}}>
        <Container>
          <Row style={{paddingRight:'5px', paddingLeft:'5px', paddingTop:'15px', paddingBottom:'15px'}}>
            <Col xs={5} style={{padding:'0'}}>
              <div style={{paddingRight:'10px', paddingLeft:'15px', fontWeight:'bolder'}}> Tokens </div>
            </Col>
            <Col style={{padding:'0',textAlign:'right'}}>
              <span style={{paddingRight:'10px',fontWeight:'bolder'}}> Burner </span>
            </Col>
            <Col style={{padding:'0',textAlign:'right', display:this.props.showBucketKeyBalances?'block':'none'}}>
              <div style={{paddingRight:'10px',fontWeight:'bolder'}}> Bucket </div>
            </Col>
          </Row>
          <div
            style={{
              backgroundColor: 'rgb(231, 246, 247)',
              height: '1px',
              marginTop:'5px',
              marginBottom:'5px'
            }}>
          </div>
          {tokens.map((value, index) => {
            return <div><TokenBalance
              onClick={this.props.onClick}
              context={this.props.context}
              token={value}
              showBucketKeyBalances={this.props.showBucketKeyBalances}
            />
              <div
                style={{
                  backgroundColor: 'rgb(231, 246, 247)',
                  height: '1px',
                  marginTop:'5px',
                  marginBottom:'5px'
                }}>
              </div>
            </div>
          })}
        </Container>
      </div>
    );
  }
  /*render() {
    const tokens = Token.getAll();
    return (
      <div style={{backgroundColor:'white'}}>
        <Table className="TokenBalances" responsive borderless striped hover size="md">
          <thead>
          <tr>
            <th>Token</th>
            <th>Balance</th>
            <th hidden={!this.props.showBucketKeyBalances}>Bucket Key(s) Balance</th>
          </tr>
          </thead>
          <tbody>
          {tokens.map((value, index) => {
            return <TokenBalance
              context={this.props.context}
              token={value}
              showBucketKeyBalances={this.props.showBucketKeyBalances}
            />
          })}
          </tbody>
        </Table>
      </div>
    );
  }
   */
}
