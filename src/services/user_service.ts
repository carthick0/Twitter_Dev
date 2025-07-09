import User from "../models/user";
import UserRepository from "../repositories/user_repository";

const userRepository = new UserRepository();

export const createUser=async(data:any)=>{
    const user=await userRepository.create(data);
    return user;
}

export const loginUser=async(email:string,password:string)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error('USer not found')
    }
    // Make sure comparePassword is defined on the User schema and takes a password argument
    const isMatch = await (user as any).comparePassword(password);
    if(!isMatch){
        throw new Error("Invalid password");
    }

    const token = (user as any).genJWT();
    return {user,token}
}
export const getUsers=async()=>{
    const user=await userRepository.getAll();
    return user;

}


export const getUser=async(id:string)=>{
    const user=await userRepository.get(id);
    return user;
}