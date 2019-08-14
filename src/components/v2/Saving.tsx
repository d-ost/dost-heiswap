import React, {Component} from 'react';
import Table from "react-bootstrap/es/Table";

interface Props {

}

interface State {

}

export default class CreatePin extends Component<Props, State> {

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
      <div className='Saving'>
        <Table responsive borderless striped hover size="md">
          <thead>
          <tr>
            <th>Token</th>
            <th>Burner Balance</th>
            <th>Bucket Balance</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>OST</td>
            <td>10</td>
            <td>100</td>
          </tr>
          <tr>
            <td>WETH</td>
            <td>20</td>
            <td>200</td>
          </tr>
          <tr>
            <td>DAI</td>
            <td>30</td>
            <td>300</td>
          </tr>
          <tr>
            <td>USDC</td>
            <td>40</td>
            <td>400</td>
          </tr>
          </tbody>
        </Table>
      </div>
    )
  }

}
