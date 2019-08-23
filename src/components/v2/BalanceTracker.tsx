import {Component} from 'react';
import {
  updateBalance,
} from "../../redux/actions";
import {connect} from "react-redux";
import Token from "../../viewModels/Token";
import BigNumber from "bignumber.js";

interface Props {
  tokens: Token[];
  updateBalance: Function;
}

interface State {
  setIntervalHandler;
}

class BalanceTracker extends Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      setIntervalHandler: -1,
    };
    this.updateBalance = this.updateBalance.bind(this);
  }

  async componentDidMount() {
    const waitTime = 10000;
    if (window.web3) {
      await this.updateBalance();
      const setIntervalHandler = setInterval(this.updateBalance, waitTime);
      this.setState({
        setIntervalHandler: setIntervalHandler,
      });
    }
  }

  async updateBalance() {
    // console.log(`BalanceTracker::Updating balance`);
    this.props.tokens.filter(token => token.isBaseCurrency)
      .forEach((token): void => {
      token.accounts.forEach(async (account) => {
        const balance = await this.getBalance(account.address);
        this.props.updateBalance({
          token,
          account,
          balance,
        });
      });
    });
  }

  async getBalance(address): Promise<BigNumber> {
    const balance = await window.web3.eth.getBalance(address);
    return new BigNumber(balance);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
    clearInterval(this.state.setIntervalHandler);
  }

  render() {
    return (null);
  }

}

const mapStateToProps = state => {
  // console.log('state  ', state);
  return {
    tokens: state.token.tokens,
  }
};

const mapDispatchToProps = {
  updateBalance,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BalanceTracker);