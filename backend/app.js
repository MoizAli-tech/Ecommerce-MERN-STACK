//Imports
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//Routes
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

app.use("/",productRoute)
app.use("/user",userRoute)


module.exports = app;