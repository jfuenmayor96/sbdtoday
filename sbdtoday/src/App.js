import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.actualizarDesdeSBD = this.actualizarDesdeSBD.bind(this);
  }

  actualizarDesdeSBD (e) {

    fetch("https://bittrex.com/api/v1.1/public/getticker?market=BTC-SBD", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {console.log(response)});
  }


  render() {
    return (
      <div className="container-fluid">
        <div className="row-fluid">
          <div className="col-lg-4 col-lg-offset-4 monedas">
            <label htmlFor="sbd">SBD </label><input type="text" id="sbd" onKeyUp={this.actualizarDesdeSBD}/><br/>
            <label htmlFor="bitcoin">Bitcoin </label><input type="text" id="bitcoin"/><br/>
            <label htmlFor="bsf">Bolívares </label><input type="text" id="bsf"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
