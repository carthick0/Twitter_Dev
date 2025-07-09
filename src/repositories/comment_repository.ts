import Comment from "../models/comments";
import CrudRepository from "./crud_repository";

class CommentRepository extends CrudRepository{
    constructor(){
        super(Comment)
    }

    async getCommentByUser(data:any){
        return await Comment.findOne(data);
    }
}

export default CommentRepository;