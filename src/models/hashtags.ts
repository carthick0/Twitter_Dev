import mongoose from "mongoose";

const hashTagSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    tweets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tweet'
        }
    ]
},{timestamps:true})

hashTagSchema.pre("save", async function (next) {
    if (this.title) {
        this.title = this.title.toLowerCase();
    }
    next();
})
const HashTag=mongoose.model("HashTag",hashTagSchema);
export default HashTag