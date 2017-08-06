import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.actualizarDesdeSBD = this.actualizarDesdeSBD.bind(this);
    this.actualizarDesdeBitcoin = this.actualizarDesdeBitcoin.bind(this);
    this.actualizarDesdeBolivares = this.actualizarDesdeBolivares.bind(this);
    this.SBDtoBTC = 0;
    this.BTCtoUSD = 0;
    this.USDtoVEF = 0;
  }

  componentDidMount() {
    // Obtiene el precio actual del dolar desde DolarToday
    axios.get('/api/USD-VEF')
      .then(response => {
        this.USDtoVEF = response.data;
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);}})

    // Obtiene el precio actual Bitcoin a través de Bittrex
    axios.get('/api/BTC-USD')
      .then(response => {
        this.BTCtoUSD = response.data;
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);}})

    // Obtiene el precio actual del SBD a través de Bittrex
    axios.get('/api/SBD-BTC')
      .then(response => {
        this.SBDtoBTC = response.data.result.Last;
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);}})
  }

  actualizarDesdeSBD (e) {
    var bitcoins = document.getElementById("bitcoin");
    var bolivares = document.getElementById("bsf");
    bitcoins.value = e.target.value*this.SBDtoBTC;
    bolivares.value = bitcoins.value*this.BTCtoUSD*this.USDtoVEF;
  }

  actualizarDesdeBitcoin (e) {
    var sbd = document.getElementById("sbd");
    var bolivares = document.getElementById("bsf");
    sbd.value = e.target.value/this.SBDtoBTC;
    bolivares.value = e.target.value*this.BTCtoUSD*this.USDtoVEF;
  }

  actualizarDesdeBolivares (e) {
    var bitcoins = document.getElementById("bitcoin");
    var sbd = document.getElementById("sbd");
    bitcoins.value = (e.target.value/this.USDtoVEF)/this.BTCtoUSD;
    sbd.value = ((e.target.value/this.USDtoVEF)/this.BTCtoUSD)/this.SBDtoBTC;
  }


  render() {
    return (
      <div className="container-fluid" style={{backgroundColor: "#4BA2F2", height: "100vh"}}>
        <div className="row-fluid" style={{height: "inherit", display: "flex", flexFlow: "row nowrap", alignItems: "center", justifyContent: "center"}}>
          <div className="col-lg-4  monedas">
            <label htmlFor="sbd">SBD </label><input type="text" id="sbd" onKeyUp={this.actualizarDesdeSBD}/><br/>
            <label htmlFor="bitcoin">Bitcoin </label><input type="text" id="bitcoin" onKeyUp={this.actualizarDesdeBitcoin}/><br/>
            <label htmlFor="bsf">Bolívares </label><input type="text" id="bsf" onKeyUp={this.actualizarDesdeBolivares}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
