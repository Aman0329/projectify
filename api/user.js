var express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
var userModel=require('../modules/user');
router.post("/signup",function(req,res){
    var institutename=req.body.institutename;
    var instituteid=req.body.instituteid;
    var email=req.body.email;
    
    var userDetails=new userModel({
        _id:mongoose.Schema.Types.ObjectId(),
        institutename:institutename,
        instituteid:instituteid,
        email:email
    });
    userDetails.save()
    .then(doc=>{
        res.status(201).json({
            message:"user registered succesfully",
            results:doc
        });
    })
    .catch(err=>{
        res.json(err);
    });
}
);
module.exports=router;