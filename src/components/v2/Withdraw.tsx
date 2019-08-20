import React, {Component} from 'react'
import Footer from "./Footer";
import NavigationBarWBB from "./NavigationBarWBB";
import {connect} from "react-redux";
import Token from "../../viewModels/Token";
import {connectToReserve, disconnectToReserve} from "../../redux/actions";

interface Props {
  selectedToken: Token;
}

interface State {

}

class Withdraw extends Component<Props, State> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }


  render() {

    return (
      <NavigationBarWBB {...this.props} title='Withdraw'>
        To be updated
        <Footer>
        </Footer>
      </NavigationBarWBB>
    )
  }

}


const mapStateToProps = state => {

  console.log('state  ', state);
  return {
    selectedToken: state.token.selectedToken,
  }
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Withdraw);


