var mongoose = require('mongoose');
var UserLogs = mongoose.model('UserLogs')
   , UserInfo = mongoose.model('UserInfo')



function getUserIP(req) {

	var ipAddress;
	var ip;
	if (!!req.hasOwnProperty('sessionID')) {
		ipAddress = req.headers['x-forwarded-for'];

	} else {
		if (!ipAddress) {
			var forwardeIpsStr = req.header('x-forwarded-for');
			if (forwardeIpsStr) {
				var forwardedIps = forwardeIpsStr.split(',');
				ipAddress = forwardedIps[0];
			}
			if (!ipAddress) {
				ipAddress = req.connection.remoteAddress;
			}
		}
	}

	ip = ipAddress.split(':');
	return ip[3];
}


var userlogs = new UserLogs();

userlogs.ID = '박성준';
userlogs.save(err => {
	if (!err) console.log(`success`)
})






exports.userLogs = function (req, res) {
	// req.body = {test : test}
	var result = req.body.test
	return res.status(200).send(result)


}

exports.userInfo = function (req, res) {

	
	res.status(200).send('wkit get Method')

}



/*const mongoose = require('mongoose');
const UserLogs = mongoose.model('UserLogs');
const UserInfo = mongoose.model('UserInfo');

function getUserIP(req) {
    let ipAddress;
    // IP 주소를 가져오는 코드 작성
    return ipAddress;
}

// UserLogs 모델의 인스턴스를 생성하고 저장하는 부분 수정
const userlogs = new UserLogs({ ID: '박성준' }); // ID를 생성자에 전달하여 인스턴스 생성
userlogs.save(err => {
    if (err) {
        console.error('Error saving user logs:', err);
    } else {
        console.log('User logs saved successfully');
    }
});

// userLogs 및 userInfo 미들웨어 함수 수정
exports.userLogs = function (req, res) {
    // req.body = {test : test}
    const result = req.body.test;
    // 적절한 응답을 보내는 코드 작성
};

exports.userInfo = function (req, res) {
    // 적절한 응답을 보내는 코드 작성
};*/















