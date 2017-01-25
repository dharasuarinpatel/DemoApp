
var http = require('http');
var express = require('express');
var app = express();


app.use(express.static(__dirname + "/public"));
app.get('/',function(req,res){
    res.sendfile(__dirname + "/" + 'index.html')
})


var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("listening");
});