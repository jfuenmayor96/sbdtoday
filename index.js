const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var axios = require('axios');
var path = require('path');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/api/SBD-BTC', (req, res) => {
  axios.get('https://bittrex.com/api/v1.1/public/getticker?market=BTC-SBD')
    .then(response => res.json(response.data))
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);}})
});

app.get('/api/BTC-USD', (req, res) => {
  axios.get('https://bittrex.com/api/v1.1/public/getticker?market=USDT-BTC')
    .then(response => res.json(response.data))
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);}})
});

app.get('/api/USD-VEF', (req, res) => {
  axios.get('https://s3.amazonaws.com/dolartoday/data.json')
    .then(response => res.json(response.data.USD.transferencia))
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);}})
});


const port = process.env.PORT || 5000;
app.listen(port);
