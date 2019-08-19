import React, {Component} from 'react'
import Footer from "./Footer";
import NavigationBarWBB from "./NavigationBarWBB";

interface Props {

}

interface State {

}

export default class Withdraw extends Component<Props, State> {

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
      <NavigationBarWBB {...this.props} title='Withdraw'>
        To be updated
        <Footer>
        </Footer>
      </NavigationBarWBB>
    )
  }

}
