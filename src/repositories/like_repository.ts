import Like from "../models/like";
import CrudRepository from "./crud_repository";

class LikeRepository extends CrudRepository{
    constructor(){
        super(Like)
    }

    async findByUserLikeable(data: any) {
        return await Like.findOne(data);
    }
}

export default LikeRepository;