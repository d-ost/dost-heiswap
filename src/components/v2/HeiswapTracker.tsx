import React, {Component} from 'react';
import {connect} from "react-redux";
import {HeiswapToken} from "../../services/Heiswap/Heiswap";
import heiswap from "../../services/Heiswap/Heiswap";
import {HEISWAP_GOERLI} from "../../utils/Constants";

interface Props {
  heiswapTokens: HeiswapToken[];
}

interface State {
  setIntervalHandler;
}

class HeiswapTracker extends Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      setIntervalHandler: -1,
    };
    this.tryWithdraw = this.tryWithdraw.bind(this);
  }

  componentDidMount() {
    const waitTime = 10000;
    if (window.web3) {
      const setIntervalHandler = setInterval(this.tryWithdraw, waitTime);
      this.setState({
        setIntervalHandler: setIntervalHandler,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
    clearInterval(this.state.setIntervalHandler);
  }

  async tryWithdraw() {

    console.log('this.props.heiswapTokens[0]  ', this.props.heiswapTokens);

    if (window.web3 && this.props.heiswapTokens.length > 0) {
      try {
        const result = await heiswap.withdraw(
          window.web3,
          HEISWAP_GOERLI,
          this.props.heiswapTokens[0],
        );
        console.log('result  ', result);
      } catch (e) {
        console.log('error on withdraw with heiswap  ', e);
      }
    }
  }

  render() {
    return (null);
  }

}

const mapStateToProps = state => {
  console.log('state  ', state);
  return {
    heiswapTokens: state.heiswap.heiswapTokens,
  }
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeiswapTracker);
