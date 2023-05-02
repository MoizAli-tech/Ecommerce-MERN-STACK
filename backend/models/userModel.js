const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name can not be greater than 30 characters"],
        minLength:[4,"Please make sure name is greater then 4 characters"]
    },

    email:{
        type:String,
        unique:[true,"user already exists"],
        required:[true,"Please enter Email"],
        validate:[validator.isEmail,"Please enter valid Email"]
    },

    password:{
        type:String,
        required:[true,"Please enter a Password"]
    },

    avatar:{
        type:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        },
        required:[true,"Please upload an image"]
    },

    role:{
        type:String,
        default:"customer"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
  

})


userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
            next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}


userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

module.exports = mongoose.model("User",userSchema);