var mongoose=require("mongoose");
mongoose.connect("mongodb+srv://aman0329:Hr02ab2016@cluster0.mgnl9.mongodb.net/prdata?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});//27017 we get from mongodb compass
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connecion error'));
db.once('open',function(){
    console.log("we are connected")
});//till here is the code for connection with mongodb