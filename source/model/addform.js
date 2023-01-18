const mongoose=require('mongoose');
const addSchema=new mongoose.Schema({
    projectname:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    approach:{
        type:String,
        required:true
    },
    reference:{
        type:String,
        required:true
    },
    
})
const adddata=new mongoose.model("adddata",addSchema);
    module.exports=adddata;