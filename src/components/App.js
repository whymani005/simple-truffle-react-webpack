import React from "react";
import ReactDOM from "react-dom";
import web3 from '../utils/getWeb3';
import "bootstrap/dist/css/bootstrap.css";

//https://github.com/babel/babel/issues/5085
import "babel-polyfill";
import "./App";

import getContract from '../utils/getContract';
import Adoption from "../../build/contracts/Adoption.json";

class App extends React.Component {

  //https://web3js.readthedocs.io/en/1.0/web3-eth-net.html
  getNetworkName(netId) {
    switch (netId) {
      case "1": return 'Mainnet';
      case "2": return 'Morden';
      case "3": return 'Ropsten';
      case "4": return 'Rinkeby';
      case "42": return 'Kovan';
      default: return 'Unknown/Private';
    }
  }


  constructor(props) {
    super(props);

    this.state = {
      web3Network: '',
      web3Accounts: [],
      adopters: [],
      owner: ''
    };

    this.getOwner = this.getOwner.bind(this);
  }

  async componentDidMount() {
    this.adoptionInstance = await getContract(Adoption);
    const adopters = await this.adoptionInstance.getAdopters();
    const accounts = await web3.eth.getAccounts();
    const networkId = this.getNetworkName(await web3.eth.net.getId());
    this.setState({ adopters: adopters, web3Accounts: accounts, web3Network: networkId});
  }

  async getOwner() {
    const owner = await this.adoptionInstance.owner();
    this.setState({ owner: owner });
  }


  renderAccounts() {
    var allAccts = this.state.web3Accounts;
    return (
      <ul>
        {allAccts.map(function(acct) {
          return (
            <li key={acct}>{acct}</li>
          )
        })}
      </ul>
    )
  }


  render() {
    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <h1>Boiler-Plate Template</h1>
          <br />
          <div>
            <p>Current Network is: {this.state.web3Network}</p>
            <p>Current List of Accounts:</p>
            {this.renderAccounts()}
          </div>
          <br />
          <button onClick={this.getOwner}>Get Deployer Address!</button>
          <h4>Deployer is: {this.state.owner}</h4>
          <br />
          <h6>Total Adopters possible: {this.state.adopters.length}</h6>
        </div>
      </div>
    );
  }
}

module.exports = App;
