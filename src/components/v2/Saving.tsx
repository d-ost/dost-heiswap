import React, {Component} from 'react';
import NavigationBarWBB from "./NavigationBarWBB";
import TokenBalances from "./TokenBalances";
import Token from "../../viewModels/Token";
import Button from "react-bootstrap/es/Button";
import {Routes} from "./Routes";

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
        <div style={{
          display: 'table',
          marginRight: 'auto',
          marginLeft: 'auto',
          marginBottom: '10px',
          marginTop: '10px',
        }}>
          <Button variant="light" onClick={()=>{this.props.history.push(Routes.SelectReserve);}}>Add Reserve</Button>
        </div>
      </NavigationBarWBB>
    )
  }

}
