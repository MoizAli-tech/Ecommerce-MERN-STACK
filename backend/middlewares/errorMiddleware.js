const ErrorHandler = require("../utils/ErrorHandler");

const errorMiddleware = (error, req, res, next) => {
  if (error) {
    
   
    if (error.name == "CastError") {
      message = `invalid id ${error.path}`;
      new ErrorHandler(message, 400);
    }
    const statusCode = error.statusCode ? error.statusCode : 500;
    res
      .status(statusCode)
      .json({
        message: error.message,
        statusCode: error.statusCode,
        success: false,
      });
  }
};

module.exports = errorMiddleware;
