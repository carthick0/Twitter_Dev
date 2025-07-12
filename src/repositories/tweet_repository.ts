import Tweet from "../models/tweet";
import CrudRepository from "./crud_repository";

class TweetRepository extends CrudRepository{

    constructor(){
        super(Tweet)
    }
    async create(data:any){
        return await Tweet.create(data);
    }
    async getTweetsByUser(userId: string) {
        return Tweet.find({ userId });
    }

}

export default TweetRepository