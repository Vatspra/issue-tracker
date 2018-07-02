/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
//var ObjectId = require('mongodb').ObjectID;
var Issue = require('../models/db');

//const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  function isEmpty( obj ) { 
  for ( var prop in obj ) { 
    return false; 
  } 
  return true; 
}
  
  app.route('/api/issues/:project')
    
    .get(function (req, res){
      console.log(req.query)
    
    
      var project = req.params.project;
      console.log(project)
      if(isEmpty(req.query)){
      //console.log("true")
      Issue.find({},function(err,issue){
        if(err){
          console.log(err.message)
         res.json({"msg":"some thing went wrong","type":err.CastError})
        }
        else{
        res.json(issue)
        }
     })
      }
    else{
      Issue.find(req.query,function(err,issue){
       console.log("hi");
        if(err){
          console.log(err)
         res.json({"msg":"some thing went wrong","errorType":"parameter expected was "+err.kind +" "+ "you passed "+err.value})
        }
        else{
        res.json(issue)
        }
      
      })
    }
      
      
    })
  //issue_title":"Fix error in posting data","issue_text":"When we post data it has an error
    
    .post(function (req, res){
      //var project = req.params.project;
      console.log(req.body)
     const issue_title = req.body.issue_title;
     const issue_text  = req.body.issue_text;
     const created_by =  req.body.created_by;
     const assigned_to = req.body.assigned_to;
     const status_text = req.body.status_text;
     
    var newIssue = new Issue({
     
      issue_title:issue_title,
      issue_text:issue_text,
      created_by:created_by,
      assigned_to:assigned_to,
      status_text:status_text

    })
      
    newIssue.save(function(err,issue){
     if(err){
       console.log(err);
       res.json({"msg":"some error occured"})
     }
      
      res.json({"_id":issue._id,
                "issue_title":issue.issue_title,
                "issue_text":issue.issue_text,
                "created_by":issue.created_by,
                "created_on":issue.created_on,
                "updated_on":issue.updated_on,
                "assigned_to":issue.assigned_to,
                "status_text":issue.status_text,
                "open":issue.open})
    
    
    })
    })
    .put(function(req,res){
      var project = req.params.project;
      console.log(req.body);
      const id = req.body._id;
      Issue.findById(id,function(err,doc){
       if(err){
        console.log(err);
        res.end("some thing went wrong")
       }
        if(!doc){
         res.end("invalid id")
        }
        console.log(req.body.open)
        if(!(req.body.issue_title||req.body.issue_text||req.body.created_by||req.body.assigned_to||req.body.status_text||(Boolean(req.body.open))))
           {
          //if(!Boolean(req.body.open)){
          //res.json({"msg":"no data sent"})}
          //else{
         res.end("can not update,no data sent")
          
          // }
      }
        else{
          var obj={};
          for(var param in req.body){
            console.log(param)
            if(req.body[param]){
              console.log(req.body[param])
              obj[param ]= req.body[param]
              
            }
          }
          
          obj.updated_on = new Date()
          Issue.update({ _id: req.body._id }, { $set: obj}, function(err,doc){
           if(err){
            console.log(err);
             res.end("can not update ,something went wrong")
           }
            else{
             res.end("successfully updated the issue of id "+req.body._id);
            }
          })
          
         }
        
      
      })
     })
    
   .delete(function (req, res){
    var project = req.params.project;
    
    Issue.findById(req.body._id,function(err,doc){
      if(err){
      
      //  res.json({"failure":"could not delete "+req.body._id })
        res.end("could not delete "+req.body._id)
      
      }
      if(!doc){
      // res.json({"failure":"no issue found with the id "+req.body._id})
        res.end("no issue found with id "+ req.body._id)
      }
      else{
      
       Issue.deleteOne({ _id:req.body._id }, function (err) {
       if (err){
       console.log(err);
      // res.json({"failed":"could not delete "+req.body._id});
         res.end("could not delete "+req.body._id)
     }
        else{
         //res.json({"success":"deleted "+req.body._id})
          res.end("deleted "+req.body._id)
        }   
     });
      
      }
    
    })
     
      
    });
    
};
