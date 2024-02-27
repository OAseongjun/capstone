var config = {
    db: "mongodb+srv://test:1234@cluster0.odczpuc.mongodb.net/"
};

var mongoose = require('mongoose');

module.exports = function(){
    var db = mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true}); 
    console.log("MongoDB ver: " + mongoose.version);	      
    mongoose.set('useCreateIndex', true); 
    
    require('../app/models/UserInfo.js');
    require('../app/models/UserLogs.js');
    
    return db;
}
