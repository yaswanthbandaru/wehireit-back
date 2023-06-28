require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

// import models
const { UserModel } = require("./models/userSchema");
const QuizModel = require("./models/questionsSchema");

// importing routes 
const userRoute = require('./routes/user_route');
const authRoute = require('./routes/auth_route');
const quizRouter = require('./routes/quiz_route');


// connection to database
require("./config/database");


let app = express();


app.use(bodyParser.json());


// app.use("/user", userRoute);
app.use("/auth", authRoute);



app.get('/', function(req, res){
    res.send("Hello yaswanth & connected to internet");
})


app.listen(port, function(req, res) {
    console.log(`Server Started listening at port: ${port} and link is: http://localhost:${port}/`);
});