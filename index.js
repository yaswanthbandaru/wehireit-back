let express = require('express');
let mongoose = require('mongoose');
require('dotenv').config();
var port = 3000;

// import models
const { UserModel } = require("./models/userSchema");
const QuizModel = require("./models/questionsSchema");


// Mongoose connection
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=> {
    console.log('Connected to MongoDB cluster');
});

mongoose.connection.on('error', (error) => {
    console.log(`MongoDB connection error: ${error}`);
});




let app = express();



// app.get('/:user', function(req, res){
//     const us = req.params.user;
//     console.log(req.params.user);
//     res.send(`we are in ${us} console`);
// })


const bodyParser = require('body-parser');
app.use(bodyParser.json());

// importing routes 
const userRoute = require('./routes/user_route');
const quizRouter = require('./routes/quiz_route');

app.use("/user", userRoute);




app.get('/', function(req, res){
    res.send("Hello yaswanth & connected to internet");
})


app.listen(port, function(req, res) {
    console.log(`Server Started listening at port: ${port} and link is: http://localhost:${port}/`);
});
