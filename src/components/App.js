import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

//https://github.com/babel/babel/issues/5085
import "babel-polyfill";
import "./App";

import getContract from '../utils/getContract';
import Adoption from "../../build/contracts/Adoption.json";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adopters: [],
      owner: ''
    };

    this.getOwner = this.getOwner.bind(this);
  }

  async componentDidMount() {
    this.adoptionInstance = await getContract(Adoption);
    const adopters = await this.adoptionInstance.getAdopters();
    this.setState({ adopters: adopters });
  }

  async getOwner() {
    const owner = await this.adoptionInstance.owner();
    this.setState({ owner: owner });
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <h1>Boiler-Plate Template</h1>
          <br />
          <button onClick={this.getOwner}>Get account OWNer</button>
          <h4>Owner is: {this.state.owner}</h4>
          <br />
          <h6>Total Adopters possible: {this.state.adopters.length}</h6>
        </div>
      </div>
    );
  }
}

module.exports = App;
