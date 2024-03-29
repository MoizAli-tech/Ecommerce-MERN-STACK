const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

async function fetchTokenId(req, res, next) {
  const { jwt: token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login first", 401));
  }

  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  if (!payload) {
    return next(new ErrorHandler("invalid token", 401));
  }
  return payload;
}

exports.isAuthenticated = async (req, res, next) => {
  try {
    let payload = await fetchTokenId(req, res, next);

    if (!payload) {
      return;
    }

    let {id} = payload;

    const user = await Users.findById(id);

    if (!user) {
      next(new ErrorHandler("User does not exits", 401));
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

// exports.isAdmin = async (req, res, next) => {
//   try {
//     let payload = await fetchTokenId(req, res, next);

//     if (!payload) {
//       return;
//     }

//     let { id } = payload;
//     const user = await Users.findOne({ _id: id, role: "admin" });

//     if (!user) {
//       next(new ErrorHandler("only admins can access this page", 401));
//       return;
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

exports.isAdmin = async (req, res, next) => {
    try {
        let {role} = req.user;
        if(role!="admin"){
            next(new ErrorHandler("Only admins can access this resource",401))
            return ;
        }
      next();
    } catch (error) {
      next(error);
    }
  };
  