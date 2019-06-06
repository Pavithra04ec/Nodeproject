const express = require('express');
//Express framework allows to set up middleware to respond http request.
//intializing the express app.
const app = express();
const route = require('../Example/routes/router');
//body-parser is a package used to handle json request.
var bodyParser = require('body-parser');
// tell the app we want to use body-parser json object.
app.use(bodyParser.json());
// {extended: true} means we can parse a nested json object , if{extends : false} then we can parse a string or arrays.
app.use(bodyParser.urlencoded({ extended: true }));

var authController = require('./auth/authcontroller');
app.use('/api/auth', authController)
// tell the app we can use router.
app.use(route);

const mongoose = require('mongoose');
//This  create a database and connect to mongodb server runnig on port : 27017.
mongoose.connect("mongodb://localhost:27017/EmployeeDb", { useCreateIndex: true, useNewUrlParser: true }, function (err, db) {
    console.log("connected");
});

// we will make server configuration on the specified port.
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server connected on ${port}`);
})
module.exports = app;