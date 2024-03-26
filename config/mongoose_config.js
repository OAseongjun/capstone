var config = {
            db: "mongodb+srv://test:1234@cluster0.odczpuc.mongodb.net/Databases"
};

var mongoose = require('mongoose');

module.exports = function(){
            var db = mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
            console.log("Connected MongoDB ver: " + mongoose.version);
            mongoose.set('useCreateIndex', true);

            require('../app/models/UserInfo.js');
            require('../app/models/UserLogs.js');


         var UserInfo = mongoose.model('UserInfo');
                    UserInfo.find({}, (err, users) => {    
                            if (err) { console.error('Error querying UserInfo:', err);                                                   }
 else{                                 
             console.log('User Info:', users);                
                }
                                                    });


            return db;
}
