let express = require('express');
let mongoose = require('mongoose');
require('dotenv').config();
var port = 3000;

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

app.get('/', function(req, res){
    res.send("Hello yaswanth & connected to internet");
})

app.listen(port, function(req, res) {
    console.log(`Server Started listening at port: ${port}`);
});