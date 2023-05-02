class ApiFeatures{
    constructor(query,querystr){
        this.query = query,
        this.querystr = querystr
    }


    search(){
        const keyword = this.querystr.keyword? {
            name:{
                $regex:this.querystr.keyword,
                $options:'i'
            }
        }:
        {
            
        }

        this.query = this.query.find({...keyword})
        
        return this;
    }

    filter(){
        let querycopy = {...this.querystr};
        const removeFields = ['keyword','page','limit'];

        removeFields.forEach((item)=>{
            delete querycopy[item]
        })

        let queryStr = JSON.stringify(querycopy);
        queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)

        this.query = this.query.find(querycopy);
        return this
    }

    pagination(){
        const resultPerPage = 5;
        
        const currentPage = Number(this.querystr.page) || 1 ;
        const skip = resultPerPage * (currentPage-1)


        this.query = this.query.find({}).limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;