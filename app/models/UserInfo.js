'use strict';

var mongoose = require('mongoose'), 
	bcrypt = require('bcrypt'),  
	Schema = mongoose.Schema;  

var UserSchema = new Schema({  
    ID: {
		 
		type: String    
		, unique: true  
		, required: true 
		, trim: true 
        , match: [/^[a-zA-Z]{1}[a-zA-Z0-9_]+$/], 
	},
    PASSWORD: {  
		type: String 
        , required: true 
  	},
    PHONE_NUMBER: {
	    type: String,
	    required: true,
	    unique: true,
	    trim: true,
    },
    NAME: {
	    type: String,
	    required: true,
	    trim: true,
    },

   
  created: {
		type: Date, 
        default: new Date()
	}
	
});



UserSchema.pre('save', async function(next) {  
	    if (this.isModified('PASSWORD')) { 
		            try {
				                const hashedPassword = await bcrypt.hash(this.PASSWORD, 10); 
				            } catch (error) {
						                return next(error);
						            }
		        }
	    next();
});

UserSchema.methods.authenticate = async function(PASSWORD) {  
	    return await bcrypt.compare(PASSWORD, this.PASSWORD); 
};


module.exports = mongoose.model('UserInfo', UserSchema);  




