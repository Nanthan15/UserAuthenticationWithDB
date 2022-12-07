const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.set("strictQuery",true);


const app = express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb+srv://Nanthan:N%40nthan%4026051981@cluster0.l5ffxlc.mongodb.net/MyData").then(()=>{
    console.log("connection Succsufully");
}).catch((e)=>{    
    console.log("Unsuccessfull",e);
})

const userSchema = {
    email:String,
    password:String,
};

const User = new mongoose.model("UserAuthentication",userSchema);

app.post("/register",function(req,res){
    const newUser = new User({
        email:req.body.username,
        password:req.body.password
    })

    newUser.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.render("secrets");
        }
    })

    
})

app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username},function(err,foundUser){
        if(err){
            alert("Please register your account");
        }
        else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("secrets");
                }
            }
        }
    })
})


app.get("/login",function(req,res){
    res.render("login")
})

app.get("/",function(req,res){
    res.render("home")
})

app.get("/register",function(req,res){
    res.render("register")
})

app.listen(4000,function(){
    console.log("Server Started on port 4000");
})

