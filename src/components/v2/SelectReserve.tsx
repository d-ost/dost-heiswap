import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import selectReserverModel, {
  ReserveAccount,
  ReserveType
} from "../../viewModels/SelectReserveModel";
import i18n from "../../i18n";
import NavigationBarWBB from "./NavigationBarWBB";
import {connect} from "react-redux";
import {
  connectToReserve,
  disconnectToReserve,
  addAccount,
  removeAccount,
} from "../../redux/actions";
import Account, {AccountType} from "../../viewModels/Account";

interface Props {
  reserves: ReserveAccount[];
  connectToReserve: Function;
  disconnectToReserve: Function;
  addAccount: Function;
  removeAccount: Function;
}

interface State {
}

class SelectReserve extends Component<Props, State> {

  private viewModel;

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    this.viewModel = selectReserverModel
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <NavigationBarWBB {...this.props} title='Select Reserve'>
        {this.getConnectedOptions()}
        {this.getConnectableOptions()}
      </NavigationBarWBB>
    )
  }

  private getConnectedOptions() {
    let options: any = [];
    let supportedOptions: ReserveAccount[] = [...this.props.reserves];
    supportedOptions.forEach((option: ReserveAccount) => {
      options.push(this.getConnectView(option));
    });
    if (options.length === 0) {
      options.push(this.getNoOptionView());
    }
    return options;
  }

  private getConnectableOptions() {
    return [];
  }

  private getNoOptionView() {
    return (
      <Card.Text>
        {i18n.t('no_option_available')}
      </Card.Text>
    );
  }

  private getConnectView(reserveAccount: ReserveAccount) {
    const isAccountAvailable = reserveAccount.account !== undefined;
    const connectButtonClass = isAccountAvailable ? 'btn btn-danger' : 'btn btn-primary';
    const connectButtonDisplayText = isAccountAvailable ? 'Disconnect' : 'Connect';
    const displayStyleForAccount = isAccountAvailable ? 'inline' : 'none';
    let action = () => {
    };
    switch (reserveAccount.type) {
      // case ReserveType.Dost:
      //   action = this.dOSTButtonClicked;
      //   break;
      case ReserveType.Metamask:
        action = isAccountAvailable ? this.metamaskDisconnect : this.metamaskConnect;
        break;
      // case ReserveType.WalletConnect:
      //   action = this.walletConnectButtonClicked;
      //   break;
    }

    return (
      <div className="card" style={{
        margin: '10px',
        boxShadow: '0 5px 15px rgba(0,0,0,.15)',
        borderRadius: '15px',
        borderWidth: '0px',
        overflow: 'hidden',
        backgroundColor: `rgba(255, 255, 255, ${reserveAccount.supportedByBrowser ? 1.0 : 0.5})`
      }}>
        <div className="card-body mb-1" style={{paddingBottom: '0px'}}>
          <h5 className="card-title">{reserveAccount.title}</h5>
          <p className="text-left">{reserveAccount.description}</p>
          <p className="text-left" style={{display: displayStyleForAccount}}>
            <span style={{fontWeight: 'bolder'}}>Connected account:</span><br/>
            <span style={{fontFamily: 'Courier New'}}>{reserveAccount.account}</span>
          </p>
        </div>
        <button type="button"
                style={{
                  display: `${reserveAccount.supportedByBrowser ? 'block' : 'none'}`,
                  paddingTop: '10px',
                  paddingBottom: '13px',
                  width: '100%',
                  backgroundColor: 'white',
                  borderWidth: '0px',
                  color: `${isAccountAvailable ? 'red' : 'black'}`,
                  borderTopWidth: '1px',
                  borderTopColor: 'rgb(231, 246, 247)',
                  borderTopStyle: 'solid'
                }}
                className={connectButtonClass}
                onClick={action.bind(this) as any}>
          {connectButtonDisplayText}
        </button>
      </div>
    );
  }


  public async metamaskConnect() {
    let connectedAddress = await this.viewModel!.connectWithMetamask();
    let allReserves = [...this.props.reserves];
    let reserveAccounts = allReserves.filter(r => r.type === ReserveType.Metamask);
    if (reserveAccounts.length > 0) {
      const metaMaskReserve = reserveAccounts[0];
      metaMaskReserve.account = connectedAddress;
      this.props.connectToReserve(
        metaMaskReserve,
      );
    }
    const account = new Account(AccountType.bucket, connectedAddress);
    this.props.addAccount({
      token: undefined,
      account: account,
    });
  }

  public metamaskDisconnect() {
    this.viewModel!.disconnectMetamask();
    let allReserves = [...this.props.reserves];
    let disconnectedAddress;
    let reserveAccounts = allReserves.filter(r => r.type === ReserveType.Metamask);
    if (reserveAccounts.length > 0) {
      const metaMaskReserve = reserveAccounts[0];
      disconnectedAddress = reserveAccounts[0].account;
      metaMaskReserve.account = undefined;
      this.props.disconnectToReserve(
        metaMaskReserve,
      );
    }
    const account = new Account(AccountType.bucket, disconnectedAddress);
    this.props.removeAccount({
      token: undefined,
      account: account,
    });
  }
}

const mapStateToProps = state => {

  return {
    reserves: state.reserves.reserves,
  }
};

const mapDispatchToProps = {
  connectToReserve,
  disconnectToReserve,
  addAccount,
  removeAccount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectReserve);
