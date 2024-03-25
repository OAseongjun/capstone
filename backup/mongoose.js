// Invoke 'strict' JavaScript mode

'use strict';

// Load the module dependencies
var	mongoose = require('mongoose');

	var uri = 'mongodb+srv://test:1234@cluster0.odczpuc.mongodb.net/'
	function dbfunc() {
	try {
		mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		mongoose.set('useCreateIndex', true);
		console.log("Mongoose ver: " + mongoose.version);
		console.log(`success connect..`);
	} catch (error) {
		console.log(error);
	}
}
	
	
	dbfunc()
