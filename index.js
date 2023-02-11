let express = require('express');
let app = express();


var port = 3000;

app.get('/', function(req, res){
    res.send("Hello yaswanth & connected to internet");
})

app.listen(port, function(req, res) {
    console.log(`Server Started listening at port: ${port}`);
});