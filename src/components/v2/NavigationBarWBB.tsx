import React, {Component} from 'react'
import backButton from "../../images/back_button.png";
import {Routes} from "./Routes";

interface Props {
  history?: any;
  title?:any;
}

interface State {

}

export default class NavigationBarWBB extends Component<Props, State> {
  constructor(props) {
    console.log('props: ', props);
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  goBack() {
    console.log("GoBack clicked, ", this.props.history);
    this.props.history.goBack()
  }

  render() {
    return (
      <div style={{maxWidth:'48rem', width:'100%', backgroundColor:'#e7f6f7'}}>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" onClick={()=>{this.goBack()}}>
            <img src={backButton} height='30' width='30' alt=""/>
          </a>
          <span style={{marginLeft:'auto', marginRight:'auto', paddingRight:'15'}}>{this.props.title}</span>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
