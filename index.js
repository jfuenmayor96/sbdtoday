const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var axios = require('axios');
var path = require('path');

app.use(express.static(path.join(__dirname, 'client/build')));
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

app.get('/api/STEEM-BTC', (req, res) => {
  axios.get('https://bittrex.com/api/v1.1/public/getticker?market=BTC-STEEM')
  .then(response => res.json(response.data))
  .catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }})

});

app.get('/api/BTC-USD', (req, res) => {
  axios.get('https://api.bitfinex.com/v2/ticker/tBTCUSD')
    .then(response =>
      res.json(response.data[6]))
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);}})
});

app.get('/api/USD-VEF', (req, res) => {
  var bsf = 0;
  axios.get('https://localbitcoins.com/sell-bitcoins-online/VEF/transfers-with-specific-bank/.json')
    .then(response => {
      for (var i = 0; i < 6; i++) {
        bsf = bsf + parseInt(response.data.data.ad_list[i].data.temp_price);
      }
      bsf = bsf / 6.0;
      res.json(bsf)
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);}})
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
  console.log(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log("SBDToday running on port " + port);
