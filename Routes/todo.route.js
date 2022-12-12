const {Router}=require("express");

const {TodoModel}=require("../Models/todo.model")

const todoRoute=Router();

todoRoute.get("/",async(req,res)=>{
    try{
        const todo=await TodoModel.find()
        res.send(todo)
    }catch(err){
        console.log(err);
        console.log({message:"something went wrong"})
    }
})

todoRoute.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const todo=new TodoModel(payload)
        await todo.save();
        res.send({message:"Post Created Successfully"})
    }catch(err){
        console.log(err);
        console.log({message:"something went wrong"})
    }
})

todoRoute.patch("/edit/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const userId=req.body.UserId
    try{
        const todoId= await TodoModel.findOne({_id:id})
        if(userId!==todoId.UserId){
            res.send({message:"Not Authorised"})
        }else{
            await TodoModel.findByIdAndUpdate({_id:id},payload)
            res.send({message:"Post Updated Successfully"})
        }
    }catch(err){
        console.log(err);
        console.log({message:"something went wrong"})
    }
})

todoRoute.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const userId=req.body.UserId
    try{
        const todoId= await TodoModel.findOne({_id:id})
        if(userId!==todoId.UserId){
            res.send({message:"Not Authorised"})
        }else{
            await TodoModel.findByIdAndDelete({_id:id})
            res.send({message:"Post Deleted Successfully"})
        }
        
    }catch(err){
        console.log(err);
        console.log({message:"something went wrong"})
    }
})

module.exports={todoRoute}