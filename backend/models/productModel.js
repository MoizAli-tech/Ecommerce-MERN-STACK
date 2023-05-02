const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please enter Product name"]
    },
    description:{
        type:String,
        required:[true,"Please enter Product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter Product price"],
        maxLength:[8,"Price can not exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],

    category:{
        type:String,
        required:[true,"Please select a Product category"]
    },

    stock:{
        type:Number,
        required:[true,"please enter Product stock"],
        maxLength:[4,"can not exceed 4 characters"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],

    user:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:true
    }
    
},{timestamps:true})

module.exports = mongoose.model("product",productSchema);