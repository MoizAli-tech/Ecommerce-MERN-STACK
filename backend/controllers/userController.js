const Users = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const jwtToken = require("../utils/jwtToken");

function userController() {
  return {
   
    async registerUser(req, res, next) {
      try {

        let { email, name, password } = req.body;
     

        const user = new Users({
          name,
          email,
          password,
          avatar: {
            public_id: "this is public id ",
            url: "this is public url",
          },
        });

        await user.save();
        jwtToken(user,res,200)

      } catch (error) {
          next(error)
      }
    },

    async loginUser(req,res,next){
      try{
          const {email,password} = req.body;
          if(!email,!password){
              next(new ErrorHandler("Please fill all fields",400))
            return;
          }

          let user = await Users.findOne({email});
          if(!user){
            next(new ErrorHandler("User does not exist",401));
            return;
          }

          const passwordMatched = await user.comparePassword(password);
          if(!passwordMatched){
            next(new ErrorHandler("Please enter valied email and password"),401)
            return;
          }
         

        jwtToken(user,res,200)

          
      }catch(error){
        next(error);
      }
    },

    async logoutUser(req,res,next){
        res.cookie("jwt",null,{
          httpOnly:true,
          expires:new Date(Date.now())
        });

        res.status(200).json({success:true,message:"Logout Successfull"})
    }
  };
}

module.exports = userController;
