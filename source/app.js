const express=require("express");
const path=require("path");
const app=express();
const Register=require("./model/registers");
require("./db/conn");
const port=process.env.PORT ||3000;
const static_path=path.join(__dirname,"../public");
app.use(express.json());
app.use(express.static(static_path));
app.post("/signup",async (req,res)=>{
    try {
        console.log(req.body.institutename);
    } catch (error) {
        res.status(400).send(error);
    }
})
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})