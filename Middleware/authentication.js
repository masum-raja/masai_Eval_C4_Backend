var jwt = require('jsonwebtoken');
require("dotenv").config();

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        const decoded=jwt.verify(token,process.env.privateKey)
        if(decoded){
            const UserId=decoded.UserId
            req.body.UserId=UserId
            next()
        }else{
            res.send({message:"unauthorized! please login"})
        }
    }else{
        res.send({message:"unauthorized! please login"})
    }
}

module.exports={auth}