import HashTagRepository from "../repositories/hastag-repository";

const hashtagRepository=new HashTagRepository();

export const crateHashtag=async(data:any)=>{
    const hashtag=await hashtagRepository.create({title:data});
    return hashtag;
}

export const getHashtags=async()=>{
    const hashtags=await hashtagRepository.getAll();
    return hashtags;
}

export const getHashtag=async(id:string)=>{
    const hashtag=await hashtagRepository.get(id);
    return hashtag;
}