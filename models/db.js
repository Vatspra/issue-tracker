const mongoose = require('mongoose');

var IssueSchema = mongoose.Schema({
  issue_title :{
   type:String,
   required:true
  },
  issue_text:{
   type:String,
   required:true
  },
  created_by:{
   type:String,
   requred:true
  },
  assigned_to:{
   type:String
  },
  status_text:{
   type:String
  },
  created_on:{
   type:Date,
   default:Date.now()
  },
  updated_on:{
   type:Date,
   default:Date.now()
  },
  open:{
   type:Boolean,
   default:true
  }
  
});


var Issue = module.exports = mongoose.model('Issue',IssueSchema);

//issue_title, issue_text, created_by, and optional assigned_to and status_text. 
//open(boolean, true for open, false for closed), and _id.