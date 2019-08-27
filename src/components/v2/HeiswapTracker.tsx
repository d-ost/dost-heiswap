import React, {Component} from 'react';
import {connect} from "react-redux";
import heiswap from "../../services/Heiswap/Heiswap";
import {HEISWAP_GOERLI, HEISWAP_ROPSTEN} from "../../utils/Constants";
import {claimHeiswapToken} from "../../redux/actions";
import Utils, {NetworkType} from "../../utils/Utils";
import Token from "../../viewModels/Token";

interface Props {
  tokens: Token[];
  claimHeiswapToken: Function;
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
    const waitTime = 50000;
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
    if (window.web3) {
      const networkType = await Utils.getNetworkType();
      const heiswapAddress = networkType === NetworkType.ropsten ? HEISWAP_ROPSTEN : HEISWAP_GOERLI;

      for (let token of this.props.tokens) {
        const filteredHeiswapTokens = token.heiswapTokens.filter((ht) => !ht.isClaimed);
        for (let filteredToken of filteredHeiswapTokens) {
          try {
            const result = await heiswap.withdraw(
              window.web3,
              heiswapAddress,
              filteredToken,
            );
            if (result.heiswapToken.isClaimed) {
              console.log('claimed transaction hash  ', result.heiswapToken.claimTransactionHash)
              this.props.claimHeiswapToken({
                  token: token,
                  heiswapToken: result.heiswapToken,
                }
              );
            }
            console.log('response from Relayer  ', result);
          } catch (e) {
            console.log('error on withdraw with heiswap  ', e);
          }
        }
      }
    }
  }

  render() {
    return (null);
  }

}

const mapStateToProps = state => {
  return {
    tokens: state.token.tokens,
  }
};

const mapDispatchToProps = {
  claimHeiswapToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeiswapTracker);
