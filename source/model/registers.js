const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const employeeSchema=new mongoose.Schema({
    institutename:{
        type:String,
        required:true,
        index:{
            unique:false,
        }
    },
    instituteid:{
        type:String,
        required:true,
        index:{
            unique:false,
        }
    },
    email:{
       type:String,
       required:true,
       index:{
           unique:false,
       } 
    },
    password:{
        type:String,
        required:true,
        index:{unique:true,
        }
    },
    confirmpassword:{
        type:String,
        sparse:true,
        required:true,
        index:{unique:true,
        }
    },
    date:{
        type:Date,
        default:Date.now
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})
//generating tokens
employeeSchema.methods.generateAuthToken=async function(){
    try {
        const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        //here process.env.SECRET_KEY is the secret key which is in .env file
    this.tokens=this.tokens.concat({token:token})
    await this.save();
 return token;
    } catch (error) {
        res.send(error);
        console.log(error);
    }

}
employeeSchema.pre("save",async function(next){
    if(this.isModified("password")){
    console.log(`the current password is ${this.password} `);
    this.password=await bcrypt.hash(this.password,10);
    console.log(`the current password is ${this.password} `);
     this.confirmpassword=await bcrypt.hash(this.confirmpassword,10);
    }
    next();
})
 //now we need to create a collection
 const Register=new mongoose.model("Register",employeeSchema);
 module.exports=Register;