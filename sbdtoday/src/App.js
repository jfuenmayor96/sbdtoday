import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.actualizarDesdeSBD = this.actualizarDesdeSBD.bind(this);
  }

  actualizarDesdeSBD (e) {
    axios.get('https://bittrex.com/api/v1.1/public/getmarkets')
      .then(response => console.log(response))
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);}})
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
