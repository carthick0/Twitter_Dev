import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:[3,"to short"]
    }
});

userSchema.pre("save", async function (next) {
    this.password=await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.genJWT=function(){
    return jwt.sign({id:this._id,email:this.email},'confidential',{expiresIn:'1h'})
}
const User= mongoose.model("User",userSchema);
export default User;