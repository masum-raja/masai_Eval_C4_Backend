const mongoose=require("mongoose")

const todoSchema=mongoose.Schema({
    taskname:String,
    status:String,
    tag:String,
    UserId:String
})

const TodoModel=mongoose.model("todo",todoSchema)

module.exports={TodoModel}