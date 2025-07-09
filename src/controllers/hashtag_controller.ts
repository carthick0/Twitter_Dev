import * as HashTagService from "../services/hashtag_service"

export const createHashtag=async(data:any)=>{
   try {
        const hashtag= await HashTagService.crateHashtag(data);
        return hashtag;
   } catch (error) {
        console.log(error);
   } 
}

export const getHashtags=async()=>{
    try {
        const hashtags=await HashTagService.getHashtags();
        return hashtags;
    } catch (error) {
        console.log(error);
    }
}

export const getHashtag=async(id:string)=>{
    try {
        const hashtag=await HashTagService.getHashtag(id);
        return hashtag;
    } catch (error) {
        console.log(error)
    }
}