var express = require('express');
//Express framework allows to set up middleware to respond http request.
//intializing the express router.
var router = express();
// body-parser is a middleware function for handling json,raw text, url encoded form data.
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var db = require('../models/model');
//jwt is a type of token based authentication. For every single request from the client to server can be accessed through jwt token
var jwt = require('jsonwebtoken');
//bcrypt allows you to hash and encrypt the sensitive data like user password before storing in the database.
var bcrypt = require('bcryptjs');
var config = require('../config');
var Schema = require('../models/joi');
var joi = require('joi');
var dateFn = Date.now();
//moment can be used to access all date and time parsing and manipulation.
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
var duration = moment.duration(560, "minutes").format();

var curr = new Date; // get current date
var first = curr.getDate() - curr.getDay();// First day is the day of the month - the day of the week
//var first = 1;
var last = first + 5; // last day is the first day + 6
var firstday = new Date(curr.setDate(first));
var lastday = new Date(curr.setDate(last));

router.post('/register', (req, res) => {
    //hashSync is used to encrypt the data.
    var data = {
        employeeId: req.body.employeeId,
        employeeName: req.body.employeeName,
        employeeMobileNo: req.body.employeeMobileNo,
        employeeEmailId: req.body.employeeEmailId,
        projectManagerId: req.body.projectManagerId,
        todayDate: dateFn,
        daysofworkstart: firstday,
        daysofworkend: lastday,
        Duration: duration,
        comments: req.body.comments,
        password: req.body.password
    };

    joi.validate(data, Schema.SchemaValidation, (err, result) => {
        data.password = bcrypt.hashSync(data.password);
        //console.log(data,'data')
        if (err) {
            res.status(404).send("joi validation failed");
        }
        else {
            db.Employee.create(data, (err, employeeDt) => {
                if (!employeeDt) return res.status(404).send("there was a problem in registering employee");
                res.status(200).send({ auth: true, employeeDt });
            })
        }
    })
});
router.post('/login', (req, res) => {
    db.Employee.findOne({ employeeEmailId: req.body.employeeEmailId }, function (err, user) {
        if (!user) return res.status(404).send('No user found.');
        //compareSync is used to compare data and encrypted to be compared
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        //jwt.sign will generate a JWT token and assign it to a user object.
        var token = jwt.sign({ employeeEmailId: user.employeeEmailId, id: user._id }, config.secret, {
            expiresIn: '24h'
        });
        //console.log(token); 
        res.status(200).send({ auth: true, token: token, user });
    });
})
module.exports = router;