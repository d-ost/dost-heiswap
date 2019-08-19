import React, {Component} from 'react'
import Navbar from "react-bootstrap/es/Navbar";
import Container from "react-bootstrap/es/Container";
import NavbarBrand from "react-bootstrap/es/NavbarBrand";
import Row from "react-bootstrap/es/Row";

interface Props {

}

interface State {

}

export default class Footer extends Component<Props, State> {

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
      <div className="fixed-bottom" style={{
        width:'100%',
        maxWidth:'48rem',
        display: 'table',
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        boxShadow: '0 5px 15px rgba(0,0,0,.25)',
      }}>
        {this.props.children}
        <Row style={{margin:'10px'}}>
          <div style={{textAlign:'center', width:'100%', color:'#438cad'}}>
            ⚠️ This product is currently in development. Use at your own risk! ⚠️
          </div>
        </Row>
      </div>
    );
/*
    return (
      <div>
        <div style={{
          backgroundColor: "#F8F8F8",
          borderTop: "1px solid #E7E7E7",
          textAlign: "center",
          padding: "20px",
          position: "fixed",
          left: "0",
          bottom: "0",
          height: "60px",
          width: "100%",
        }} />
        <div style={{
          display: 'block',
          padding: '20px',
          height: '60px',
          width: '100%',
        }}>
          This is a test footer.
        </div>
      </div>
    )
    */
  }
}
