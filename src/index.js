var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var Sellsy = require('node-sellsy');

app = express();
app.use(cors());

if (!process.env.SELLSY_CREDS) {
  console.error('⚠️  missing SELLSY_CREDS environment variable. please refer to the README.\n')
  process.exit(1)
}

const SELLSY_CREDS = {
consumerKey:"4f79044c9cbdc0dad84ec7426a4a2b19124403c7",
 consumerSecret:"29523a12ce28702e22184377a819d0c4eb2c53dd",
  userToken:"9f09e9246ceb3ee1d3db55d07b6fd3f10e00bef8",
  userSecret:"4a1846f7357fe2245e86c2095bbfabe9c48db22f"
};

app.get('/', (req, res) => {
  var sellsy = new Sellsy({
    creds: SELLSY_CREDS
  })

  sellsy.api({
    method: req.query.method,
    params: req.query.params
  }).then(data => {
    res.json(data);
  }).catch(e => {
    res.json({
      error: true,
      e
    });
  });
})

const PORT = process.env.PORT || 8282;

app.listen(PORT, () => {
  console.log(`sellsy-proxy listening on http://127.0.0.1:${PORT}`)
})

