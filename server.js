

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
var express = require('./config/express_config')
  , mongoose = require('./config/mongoose_config')
  , user_passport = require('./config/passport/user_passport');
  const axios = require('axios');


mongoose();

var app = express()
  , user_passport = user_passport()
  , port = process.env.PORT || 10111;

global.socketSalt = '';
// global.socketCli = require('socket.io-client')('http://localhost:' + port, {secure: true, rejectUnauthorized: false})
global.socketCli = require('socket.io-client')('http://34.22.99.232' + port)
app.listen(port, function (err) {
  if (!err) {
    console.log("server start");
    socketCli.on('connect', function (err) {
      if (err) {
        console.log("server open err");
      } else {
        console.log("Server running at http://34.22.99.232" + port);
      }
    })
  } else {
    console.log("server open err");
  }
});
