const express=require("express");
require("dotenv").config()

const {connection}=require("./Config/db")
const {signUp}=require("./Routes/signUp.route")
const {signIn}=require("./Routes/signIn.route")
const {auth}=require("./Middleware/authentication")
const {todoRoute}=require("./Routes/todo.route");



const app=express();
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Wlecome Home Page")
})

app.use("/signUp",signUp)
app.use("/signIn",signIn)
app.use(auth)
app.use("/todos",todoRoute)

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log({message:"DB Connected Successfully"})
    }catch(err){
        console.log(err)
        console.log({message:"DB Connection Fail"})
    }
    console.log({message:`Listen on port ${process.env.port}`})
})