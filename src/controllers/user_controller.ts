import * as UserService  from "../services/user_service";


export const createUser = async(data:any)=>{
    try {
        const user=await UserService.createUser(data);
        return user;
    } catch (error) {
        console.error("Error in createUser:", error);
        throw new Error("Failed to create user");
    }
}

export const loginUser=async({email,password}:{email:string;password:string})=>{
    try {
        const user=await UserService.loginUser(email,password);
        return user
    } catch (error) {
        console.error("❌ Error in loginUser:", error);
        throw new Error("Login failed");
    }
}
export const getUser=async(id:string)=>{
    try {
        const user=await UserService.getUser(id);
        return user;
    } catch (error) {
        console.error(error);
    }
}

export const getUsers=async()=>{
    try {
        const user=await UserService.getUsers();
        return user;
    } catch (error) {
        console.log(error)
    }
}