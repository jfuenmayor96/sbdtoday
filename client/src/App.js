import React, { Component } from 'react';
import './App.css';
import axios from "axios";
var Scroll = require('react-scroll');
var Link = Scroll.Link;

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
    // Obtiene el precio actual del dolar desde DolarToday a través del API
    axios.get('http://sbdtoday.herokuapp.com/api/USD-VEF')
      .then(response => {
        this.USDtoVEF = response.data;
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);}})

    // Obtiene el precio actual Bitcoin a través de Bitfinex a través del API
    axios.get('http://sbdtoday.herokuapp.com/api/BTC-USD')
      .then(response => {
        this.BTCtoUSD = response.data;
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);}})

    // Obtiene el precio actual del SBD a través de Bittrex a través del API
    axios.get('http://sbdtoday.herokuapp.com/api/SBD-BTC')
      .then(response => {
        this.SBDtoBTC = response.data.result.Last;
      })
      .catch(function (error) {
        if (error.response) {
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
      <div className="container-fluid">
        <Link className="flecha" to="informacion" spy={true} smooth={true} offset={0} duration={1000} delay={100}>
          <span className="glyphicon glyphicon-chevron-down"></span>
        </Link>
        <div className="row principal">
          <div className="col-lg-4 col-md-5 col-sm-6 col-xs-10 monedas">
            <label htmlFor="sbd">SBD </label><input type="text" id="sbd" onKeyUp={this.actualizarDesdeSBD}/><br/>
            <label htmlFor="bitcoin">Bitcoin </label><input type="text" id="bitcoin" onKeyUp={this.actualizarDesdeBitcoin}/><br/>
            <label htmlFor="bsf">Bolívares </label><input type="text" id="bsf" onKeyUp={this.actualizarDesdeBolivares}/>
          </div>
        </div>
        <div className="row informacion" id="informacion">
          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1" style={{color: "black"}}>
            <h1>SBDToday</h1>
          </div>
          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1" style={{color: "black"}}>
            <h2>¿Qué es SBDToday?</h2>
            <p>SBDToday surge como una idea pensada para los usuarios venezolanos que hacen vida en la comunidad de Steemit con el fin de que éstos puedan tener un valor de referencia sobre cuántos Bolívares y Bitcoins representan sus ganancias en SBD.<br/><br/>
            <p>Este proyecto cuenta con el apoyo y patrocinio del grupo <a href="https://steemit.com/@provenezuela">@provenezuela</a> en Steemit.</p> <br/>
            <div style={{display: "flex", justifyContent: "center"}}>
              <a href="https://steemit.com/@provenezuela" alt="Perfil de steemit de provenezuela"><img className="img-responsive" src={require("./assets/provenezuela.png")} alt="Logo de provenezuela"/></a>
            </div>

            </p>
          </div>
          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1" style={{color: "black", paddingTop: "15px", paddingBottom: "15px"}}>
            <h2>¿Cómo funciona?</h2>
            <p>Es tan simple como colocar el valor que deseas convertir en el recuadro correspondiente a su moneda, y automáticamente los otros dos campos se actualizarán con su respectiva conversión.</p>
          </div>
          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1" style={{color: "black", paddingTop: "15px", paddingBottom: "45px"}}>
            <h2>¿Cómo hacen la conversión?</h2>
            <p>Cada vez que se ingresa a SBDToday se descarga la última información disponible de las tasas de cambio proporcionadas por las APIs de <b>Bittrex</b> para convertir de <b>SBD a Bitcoin</b> y la de <b>Bitfinex</b> para convertir de <b>Bitcoin a Dólares</b>. En ningún momento SBDToday establece algún tipo de tasa de cambio. Todos los valores aquí presentes deben ser considerados como valores de referencia.</p>
          </div>
        </div>
        <br/>
        <div className="row">
          <footer>
            <div className='col-lg-6 col-md-6 visible-lg visible-md hidden-xs hidden-sm' style={{backgroundColor: "#1A5099", height: "46px", paddingTop: "13px"}}>
              <p>SBDToday 2017. Aplicación diseñada por Julio Fuenmayor. Todos los derechos reservados.</p>
            </div>
            <div className="col-lg-6 col-md-6 visible-lg visible-md hidden-xs hidden-sm" style={{backgroundColor: "#1A5099"}}>
                <p style={{textAlign: "right"}}>
                    <a href="https://jfuenmayor96.github.io" alt="Portafolio de Julio Fuenmayor"><i className="fa fa-2x fa-briefcase" aria-hidden="true"></i></a>
                    <a href="https://linkedin.com/in/jefuenmayor" alt="Linkedin de Julio Fuenmayor"><i className="fa fa-2x fa-linkedin-square" aria-hidden="true"></i></a>
                    <a href="https://github.com/jfuenmayor96" alt="Github de Julio Fuenmayor"><i className="fa fa-2x fa-github" aria-hidden="true"></i></a>
                </p>
            </div>
            <div className="col-sm-12 col-xs-12 visible-sm visible-xs hidden-lg hidden-md" style={{backgroundColor: "#1A5099"}}>
                <p style={{textAlign: "center"}}>
                    <a href="https://jfuenmayor96.github.io" alt="Portafolio de Julio Fuenmayor"><i className="fa fa-2x fa-briefcase" aria-hidden="true"></i></a>
                    <a href="https://linkedin.com/in/jefuenmayor" alt="Linkedin de Julio Fuenmayor"><i className="fa fa-2x fa-linkedin-square" aria-hidden="true"></i></a>
                    <a href="https://github.com/jfuenmayor96" alt="Github de Julio Fuenmayor"><i className="fa fa-2x fa-github" aria-hidden="true"></i></a>
                </p>
            </div>
            <div className='col-sm-12 col-xs-12 visible-sm visible-xs hidden-lg hidden-md' style={{textAlign: "center", backgroundColor: "#1A5099", height: "auto", paddingTop: "10px"}}>
              <p>SBDToday 2017. Aplicación diseñada y desarrollada por Julio Fuenmayor. Todos los derechos reservados.</p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
