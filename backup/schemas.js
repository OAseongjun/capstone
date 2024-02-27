'use strict';

var mongoose = require('mongoose'), 
   Schema = mongoose.Schema;  

var moment = require('moment');

var userLogs = new Schema({  
   empno: {
      type: String
   },
   name : {
      type: String
   },
   event: {
      type: String
   },
   IPAddress: {
      type: String
   },
   created: {
      type: Date,
      default: new Date()
         
   }
});

var metadataInfo = new Schema({  
    empno: {
       type: String
    },
    name : {
       type: String
    },
    event: {
       type: String
    },
    IPAddress: {
       type: String
    },
    created: {
       type: Date,
       default: new Date()
          
    }
 });





mongoose.model('userLogs', userLogs,'userLogs');
mongoose.model('metadataInfo', metadataInfo,'metadataInfo');