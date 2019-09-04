import {Component} from 'react';
import {

} from "../../redux/actions";
import {connect} from "react-redux";
import Metamask from "../../services/Metamask";
import {Network as NetworkViewModel, NetworkConfig, WalletType} from "../../viewModels/Network";

interface Props {
  walletType: WalletType;
  networkConfig: NetworkConfig;
  updateWalletType: Function,
  updateNetworkConfiguration: Function
}

interface State {
  walletType?: WalletType;
  networkConfig?: NetworkConfig;
  updateWalletType?: Function,
  updateNetworkConfiguration?: Function
}

class Network extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const selectedWallet: WalletType = this.props.walletType;
    const networkConfig:NetworkConfig = this.props.networkConfig;
    console.log('networkConfig :- ',networkConfig);
    switch (selectedWallet) {

      case WalletType.Metamask:
        const metamask = new Metamask();
        if(metamask.isMetamaskSupported()) {
          let ethereum = (window as any).ethereum;
          ethereum.on("accountsChanged",
            (newAccount) => NetworkViewModel.subscribeAccountsChanged(newAccount)
          );
        }
        break;

      case WalletType.WalletConnect:
        break;

      case WalletType.Custom:
        break;
    }

  }

  componentWillUnmount() {
    this.state = {};
  }

  render() {
    return (null);
  }

}

const mapStateToProps = state => {
  return {
    walletType: state.network.walletType,
    networkConfig: state.network.networkConfig
  }
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Network);

