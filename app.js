require('dotenv').config();
const mongoose=require('mongoose');
const cookieparser=require("cookie-parser");
const express=require('express');
const bcrypt=require("bcrypt");
const path=require('path');
const app=express();
const ejs=require('ejs');
const port=process.env.PORT ||3800;
const Register=require("./source/model/registers");
const auth=require("./source/model/middleware/auth");
const adddata=require("./source/model/addform");
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:false})); //to get data from form
require("./source/db/conn");
app.use('/static',express.static('static'));
app.use(express.static('public'));
app.set('views',path.join(__dirname+'/views'));
const templatePath = path.join(__dirname, '/../templates/views')
app.set('view engine','pug');
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.status(200).render('index.pug')
});
app.get("/logout",auth, async(req,res)=>{
      try {
          res.clearCookie("jwt");
          console.log("logout succesfull");
         await req.user.save();
         res.send("logout succesfull");
      } catch (error) {
          res.status(500).send(error);
      }
})
app.get('/add',auth,(req,res)=>{
    res.status(200).render("add.pug");
});
app.get('/cmpny-sgn',(req,res)=>{
    res.status(200).render('cmpnysignup.pug')
});
app.get('/signup',(req,res)=>{
res.status(200).render('signup.pug')
});
app.post("/signup",async (req,res)=>{
    try {
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password==cpassword){
            const registerEmployee= new Register({
                institutename:req.body.institutename,
                instituteid:req.body.instituteid,
                email:req.body.email,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })
            const token=await registerEmployee.generateAuthToken();
            //the res.cookie() function is used to set the cookie name to value . the value parameter may be a string or a object
            //syntax: res.cookie(name,value,{options}) 
            res.cookie("jwt",token,{
                expires:new Date(Date.now()+3000000),
                httpOnly:true
            });
           const registered=await registerEmployee.save();
           res.status(201).render('index.pug');
        }
        else{
            res.send("password are not macthing");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})
app.post("/add",async (req,res)=>{
       try {
           const Adddata=new adddata({
            projectname:req.body.projectname,
            Description:req.body.Description,
            approach:req.body.approach,
            reference:req.body.reference
           })
           const added=await Adddata.save();
           res.status(201).render('login.pug');
       } catch (error) {
           res.status(400).send(error);
       }
})
app.get('/login',(req,res)=>{
    res.status(200).render('login.pug')
    });
    app.post("/login",async (req,res)=>{
        try {
            const email=req.body.email;
            const password=req.body.password;
            const useremail=await Register.findOne({email:email});
            const isMatch=await bcrypt.compare(password,useremail.password);

            const token=await useremail.generateAuthToken();
            console.log("the "+token);
            res.cookie("jwt",token,{
                expires:new Date(Date.now()+60000000),
                httpOnly:true,
                //secure:true    use under https for secure connection only
            });

            
            if(isMatch){
                res.status(201).render("index.pug");
            }
            else{
                res.send("password invalid");
            }
        } catch (error) {
            res.status(400).send("invalid details")
        }
    })

    
    app.get('/view',auth,(req,res)=>{
        adddata.find({},function(err,adddatas){
            res.render('adddata.ejs',{
                adddatasList:adddatas
            })
        })
   });
app.listen(port,()=>{
    console.log(`the application is started succesfully on port ${port}`);
});