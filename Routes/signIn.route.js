const {Router}=require("express")
const jwt = require('jsonwebtoken');
require("dotenv").config()
const bcrypt = require('bcrypt');

const {SignUpModel}=require("../Models/signUp.model")

const signIn=Router();

signIn.post("/",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await SignUpModel.find({email})
        if(user.length>0){
            const hashPass=user[0].password
            bcrypt.compare(password,hashPass,(err,result)=>{
                if(result){
                    const token=jwt.sign({"UserId":user[0]._id},process.env.privateKey)
                    res.send({message:"SignIn Successfull",token})
                }else{
                    res.send({message:"Something went wrong! Please try again"})
                }
            })
        }else{
            res.send({message:"Something went wrong! Please try again"})
        }
    }catch(err){
        console.log(err)
        console.log({message:"Something went wrong"})
    }
})

module.exports={signIn}