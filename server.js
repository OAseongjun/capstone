/* ver1.0

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
}); */

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
var express = require('./config/express_config')
  , mongoose = require('./config/mongoose_config')
  , user_passport = require('./config/passport/user_passport')
  , UserInfo = require('./app/models/UserInfo')
  , UserLogs = require('./app/models/UserLogs')
  , jwt = require('jsonwebtoken')
  , bcrypt = require('bcrypt');
  
  var app = express();



mongoose();

/* 회원가입 페이지 로직*/
app.post('/signup', async (req, res) => {
	  const { ID, PASSWORD, PHONE_NUMBER, NAME } = req.body;

	try {
		//고유 ID 생성 필요시 주석 해제
		//const uniqueID = generateUniqueID();
		// 비밀번호 해싱
		const hashedPassword = await bcrypt.hash(PASSWORD, 10);

		//사용자 정보 생성
		const newUser = new UserInfo({
			      ID,
			      PASSWORD: hashedPassword,
			      PHONE_NUMBER,
			      NAME
			    });

		//데이터베이스에 저장

		await newUser.save();

		    res.status(201).json({ message: 'User created successfully' });
		  } catch (error) {
			      console.error(error);
			      res.status(500).json({ message: 'Server error' });
			    }
});

/* 로그인 JWT 로직 */
app.post('/login', async (req, res) => {
	  const { ID, PASSWORD } = req.body;

	  try {
		      const user = await UserInfo.findOne({ ID });

		      if (!user) {
			            return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
			          }

		      const isPasswordValid = await bcrypt.compare(PASSWORD, user.PASSWORD);

		      if (!isPasswordValid) {
			            return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
			          }

		      const token = jwt.sign({ ID: user.ID }, 'secret_key', { expiresIn: '1h' });

		      res.status(200).json({ token });
		    } catch (error) {
			        console.error(error);
			        res.status(500).json({ message: "서버 오류" });
			      }
});

function authenticateToken(req, res, next) {
	  const authHeader = req.headers['authorization'];
	  const token = authHeader && authHeader.split(' ')[1];
	  
	  if (token == null) return res.status(401).json({ message: "인증 토큰이 없습니다." });

	  jwt.verify(token, 'secret_key', (err, user) => {
		      if (err) return res.status(403).json({ message: "인증에 실패했습니다." });
		      req.user = user;
		      next();
		    });
}


app.get('/protected', authenticateToken, (req, res) => {
	  res.json({ message: '보호된 정보에 접근했습니다.', user: req.user });
});

var user_passport = user_passport()
  , port = process.env.PORT || 10111;

global.socketSalt = '';

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
