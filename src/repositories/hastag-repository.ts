import HashTag from "../models/hashtags";
import CrudRepository from "./crud_repository";

class HashTagRepository extends CrudRepository{
    constructor(){
        super(HashTag)
    }

    async bulkCreate(data:any){
        try {
            const tags=await HashTag.insertMany(data)
        } catch (error) {
            console.log(error)
        }
    }

     async findByTitles(titles: string[]) {
        return await HashTag.find({ title: { $in: titles } });
    }
}

export default HashTagRepository;