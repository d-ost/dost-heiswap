import React, {Component} from 'react'
import { IconContext } from "react-icons";
import {FaHome} from "react-icons/fa";
import {Link} from 'react-router-dom';

import backButton from "../../images/back_button.png";

interface Props {
  history?: any;
  title?:any;
}

interface State {

}

export default class NavigationBarWBB extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div style={{maxWidth:'48rem', width:'100%', backgroundColor:'#e7f6f7', boxShadow: '0 5px 15px rgba(0,0,0,.25)'}}>
        <div className="fixed-top" style={{
          width:'100%',
          maxWidth:'48rem',
          display: 'table',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}>
          <div className="navbar navbar-light" style={{
            backgroundColor: 'white',
            boxShadow: '0 5px 15px rgba(0,0,0,.25)',
            paddingRight:'45px'
          }}>

            <a className="navbar-brand" onClick={()=>{this.goBack()}}>
              <img src={backButton} height='30' width='30' alt=""/>
            </a>
            <div className="navbar-brand">
              <IconContext.Provider value={{ color: "black" }}>

              <Link to="/"> <FaHome/></Link>
              </IconContext.Provider>
            </div>
            <span style={{marginLeft:'auto', marginRight:'auto', paddingRight:'15', fontWeight:'bolder',
              color:'#34445b'}}>{this.props.title}</span>
          </div>
        </div>
        <div style={{marginTop:'70px'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
