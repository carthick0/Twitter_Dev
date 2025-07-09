import mongoose from "mongoose";

const commentSchema= new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    onModel:{
        type:String,
        enum:["Tweet","Comment"]
    },
   
     commentable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ] ,
     likes:[
       {
         type:mongoose.Schema.Types.ObjectId,
         ref:'Like'
        
        }
    ],
},{timestamps:true})

const Comment=mongoose.model("Comment",commentSchema);
export default Comment;