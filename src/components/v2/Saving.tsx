import React, {Component} from 'react';
import NavigationBarWBB from "./NavigationBarWBB";
import TokenBalances from "./TokenBalances";
import Token from "../../viewModels/Token";
import Button from "react-bootstrap/es/Button";
import {Routes} from "./Routes";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Footer from "./Footer";

interface Props {
  context?:any
  history:any;
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

  tokenClicked(token:Token) {
    this.props.history.push(Routes.Withdraw);
    console.log('Token clicked: ', token);
  }


  render() {

    return (
      <NavigationBarWBB {...this.props} title='Savings'>
        <div style={{marginLeft:'1px', marginRight:'1px'}}>
          <TokenBalances
            onClick={(token:Token)=>{this.tokenClicked(token)}}
            context={this.props.context}
            showBucketKeyBalances={ true }
          />
        </div>

        <Footer>
          <Row style={{margin:'10px'}}>
            <Col style={{paddingRight:'5px', paddingLeft:'0px'}}>
              <Button
                onClick={()=>{this.props.history.push(Routes.SelectReserve);}}
                style={{
                  fontWeight:'bolder',
                  display:'inline',
                  width:'100%',
                  backgroundColor: '#34445b',
                  color:'white',
                  borderWidth:'0px',
                  height:'55px',
                  boxShadow: '0 5px 15px rgba(0,0,0,.15)',
                  borderRadius:'15px',
                }}>
                Add Reserve
              </Button>
            </Col>
          </Row>
        </Footer>
      </NavigationBarWBB>
    )
  }

}
