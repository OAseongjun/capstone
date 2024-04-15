'use strict';

var mongoose = require('mongoose'), 
	Schema = mongoose.Schema;  

var moment = require('moment');

var UserLogs = new Schema({  
    
		created: {
			type: Date,
			default: new Date()
			
		},
		event: {
			type: String
		},
		IPAddress: {
			type: String
		},
		ID : {
			type: String
		}
		
	});


module.exports = mongoose.model('UserLogs', UserLogs);  



