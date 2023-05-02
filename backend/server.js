require("dotenv").config({path:"./backend/config/.env"});
require("./config/dbConnect")();
const app = require("./app");
const errorMiddleware = require("./middlewares/errorMiddleware");
const ErrorHandler = require("./utils/ErrorHandler");

const server = app.listen(process.env.PORT || 5500)


process.on("uncaughtException",(error)=>{
    console.log(error.message);
    console.log("shutting down the server due to exception")
    throw Error("i have an error")
    server.close(()=>{
        process.exit(1);
    });
})



//Error Handling

app.use(errorMiddleware)


process.on("unhandledRejection",(error)=>{
    console.log(error.message);
    console.log("shutting down the server due to rejection")
 
   

    server.close(()=>{
        process.exit(1);
    });
})