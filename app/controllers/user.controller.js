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

userlogs.ID = '테스터';
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















