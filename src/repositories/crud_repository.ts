class CrudRepository{
    private model: any;

    constructor(model: any) {
        this.model = model;
    }

    async create(data:any){
        return this.model.create(data);
    }

    async get(id:any){
        return this.model.findById(id)
    }
    async getAll(){
        return this.model.find()
    }
    async delete(id:any){
        return this.model.findByIdAndDelete(id);
    }
}

export default CrudRepository;