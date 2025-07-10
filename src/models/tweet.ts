import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  hashtags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HashTag",
    },
  ],
  likes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Like"
    }
  ],
  image:{
    type:String
  },
}, { timestamps: true });

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
