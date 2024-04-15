/* ver 1
const express = require('express') 
    , fileUpload = require('express-fileupload')
    , morgan = require('morgan')
    , compress = require('compression')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override') 
    , passport = require('passport') 
    , APIroutesConfig = require('./routes_config')
    , http = require('http')
    , socketio = require('socket.io')


module.exports = function(){
  var app = express()  
    , server = http.createServer(app)
    , io = socketio(server,  { 'destroy buffer size': Infinity, 
                                pingTimeout: 600000, 
                                pingInterval: 300000, 
                                upgradeTimeout:30000,
                                cors: {
                                  origin: '*',  //소켓 통신 크로스도메인 허용
                                }
      })
    , UserApiRoutes = express.Router();		
    
    app.use(morgan('dev'));
    app.use(compress()); 
    app.use(bodyParser.urlencoded({limit:"50mb", extended: false}));
    app.use(bodyParser.json({limit:"50mb"}));
    app.use(methodOverride());
    app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : 'tmp/', 
      createParentPath: true
    }));
    app.use(passport.initialize()); 
    app.use(express.static('./public'));
    
    
    
    UserApiRoutes.use(APIroutesConfig.userapi);  
    require('../app/routes/user.api.routes')(app,UserApiRoutes);
    require('./socketio')(io);

   app.get('/', function(req,res) {
	   res.send('Team EXIT SOS Solution');
   }); //테스트용라우터

	  return server;	 
   
}*/


const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const APIroutesConfig = require('./routes_config');
const cors = require('cors');

module.exports = function() {
	  var app = express()
	    .use(morgan('dev'))
	    .use(compress())
	    .use(bodyParser.urlencoded({ limit: "50mb", extended: false }))
	    .use(bodyParser.json({ limit: "50mb" }))
	    .use(methodOverride())
	    .use(fileUpload({
		          useTempFiles: true,
		          tempFileDir: 'tmp/',
		          createParentPath: true
		        }))
	    .use(passport.initialize())
	    .use(cors())
	    .use(express.static('./public'));

	  const UserApiRoutes = express.Router();
	  UserApiRoutes.use(APIroutesConfig.userapi);
	  require('../app/routes/user.api.routes')(app, UserApiRoutes);

	  app.get('/', function(req, res) {
		      res.send('Team EXIT SOS Solution');
		    });

	  app.post('/user', (req, res) => {
		      const { firstName, lastName } = req.body;
		      res.status(200).json({ message: 'User data received successfully' });
		    });

	  return app;
}

