const express = require('express') 
    , compress = require('compression')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , passport = require('passport') 
    , http = require('http')
    , socketio = require('socket.io')
    , cors = require('cors'); 
  

module.exports = function(){
  var app = express()  
    , server = http.createServer(app)
    , UserApiRoutes = express.Router();		
    
    app.use(cors({
      origin: '*', 
      credential: 'true' 
    }));
    app.use(compress()); 
    app.use(bodyParser.urlencoded({limit:"50mb", extended: false}));
    app.use(bodyParser.json({limit:"50mb"}));
    app.use(methodOverride());

    app.use(passport.initialize()); 
    app.use(express.static('./public'));
    require('../app/routes/user.api.routes')(app,UserApiRoutes);
	  return server;	 
   
}
