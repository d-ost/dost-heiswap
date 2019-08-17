import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import { SelectReserveModel, ReserveType, ReserveAccount } from "../../models/SelectReserveModel";
import i18n  from "../../i18n";
import NavigationBarWBB from "./NavigationBarWBB";
import Button from "react-bootstrap/es/Button";
import {Routes} from "./Routes";

interface Props {}
interface State {}

export default class SelectReserve extends Component<Props, State> {

  private viewModel?: SelectReserveModel;

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    this.viewModel = new SelectReserveModel();
    this.setState({});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {}

  render() {
    return (
      <NavigationBarWBB {...this.props} title='Select Reserve'>
        {this.getConnectedOptions()}
        {this.getConnectableOptions()}
      </NavigationBarWBB>
    )
  }

  private getConnectedOptions() {
    let options:any = [];
    if (!this.viewModel) {
      options.push( this.getNoOptionView());
    } else {
      let supportedOptions: ReserveAccount[] = this.viewModel!.getReserveAccountList();
      supportedOptions.forEach((option: ReserveAccount)=>{
        options.push(this.getConnectView(option));
      });
      if (options.length === 0) {
        options.push( this.getNoOptionView());
      }
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
  private getConnectView(reserveAccount: ReserveAccount){
    const isAccountAvailable = reserveAccount.account!==undefined;
    const connectButtonClass = isAccountAvailable?'btn btn-danger' : 'btn btn-primary';
    const connectButtonDisplayText = isAccountAvailable?'Disconnect' : 'Connect';
    const displayStyleForAccount = isAccountAvailable?'inline' : 'none';
    let action = ()=>{};
    switch (reserveAccount.type) {
      case ReserveType.Dost:
        action = this.dOSTButtonClicked;
        break;
      case ReserveType.Metamask:
        action = isAccountAvailable?this.metamaskDisconnect:this.metamaskConnect;
        break;
      case ReserveType.WalletConnect:
        action = this.walletConnectButtonClicked;
        break;
    }

    return (
      <div className="card" style={{
        margin: '10px',
        boxShadow: '0 5px 15px rgba(0,0,0,.15)',
        borderRadius:'15px',
        borderWidth:'0px',
        overflow: 'hidden',
        backgroundColor:`rgba(255, 255, 255, ${reserveAccount.supportedByBrowser?1.0:0.5})`
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
                  display:`${reserveAccount.supportedByBrowser?'block':'none'}`,
                  paddingTop: '10px',
                  paddingBottom:'13px',
                  width: '100%',
                  backgroundColor:'white',
                  borderWidth:'0px',
                  color:`${isAccountAvailable?'red':'black'}`,
                  borderTopWidth:'1px',
                  borderTopColor:'rgb(231, 246, 247)',
                  borderTopStyle:'solid'}}
                className={connectButtonClass}
                onClick={action.bind(this) as any}>
          {connectButtonDisplayText}
        </button>
      </div>
    );
  }

  // Click handlers
  public dOSTButtonClicked() {
    console.log('dOSTButtonClicked');
  }
  public async metamaskConnect() {
    console.log('metamaskConnect');
    let connectedAddress = await this.viewModel!.connectWithMetamask();
    this.setState({});

    console.log('connectedAddress: ', connectedAddress);
  }
  public metamaskDisconnect() {
    console.log('metamaskDisconnect');
    this.viewModel!.disconnectMetamask();
    this.setState({});
  }
  public async walletConnectButtonClicked() {
    console.log('walletConnectButtonClicked');
    let connectedAddress = await this.viewModel!.connectWithWalletConnect();
    this.setState({});
  }

}
