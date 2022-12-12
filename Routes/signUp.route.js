const {Router}=require("express")
const bcrypt = require('bcrypt');

const {SignUpModel}=require("../Models/signUp.model")

const signUp=Router();

signUp.post("/",async(req,res)=>{
    const {name,age,email,password}=req.body;
    const userPresent=await SignUpModel.findOne({email});

    if(userPresent){
        res.send({message:"user already exist"})
    }else{
        try{
            bcrypt.hash(password,5,async(err,hash)=>{
                const user=new SignUpModel({name,age,email,password:hash})
                await user.save();
                res.send("User Created Successfully")
            })
        }catch(err){
            console.log(err)
            console.log({message:"Something went wrong"})
        }
    }
})

module.exports={signUp}