var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require('fs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static("."))
app.listen(8080, function() {
    console.log("Running...");
});

app.get("/", function(req,res) {
  res.render("index.html");
});