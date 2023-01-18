var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/ signuppage",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});//27017 we get from mongodb compass
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connecion error'));
db.once('open',function(){
    console.log("we are connected")
});//till here is the code for connection with mongodb
var userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId(),
    institutename:{
        type:String,
        required:true,
        index:{
            unique:true,
        }
    },
    instituteid:{
        type:String,
        required:false,
        index:{
            unique:true,
        }
    },
    email:{
       type:String,
       required:true,
       index:{
           unique:true,
       } 
    },
    date:{
        type:Date,
        default:Date.now
    }

});
var userModel=mongoose.model('users',userSchema);
module.exports=userModel;
