//controller, which is the logic of how the app handles the incoming request and outgoing response.

var db = require('../models/model');
//bcrypt allows you to hash and encrypt the sensitive data like user password before storing in the database.
var bcrypt = require('bcryptjs');
var joi = require('joi');
var Schema = require('../models/joi')
//moment can be used to access all date and time parsing and manipulation.
var moment = require('moment');
var dateFn = Date.now();
var momentDurationFormat = require("moment-duration-format");
momentDurationFormat(moment);
var duration = moment.duration(6, "hours").format();
var curr = new Date; // get current date
var first = curr.getDate() - curr.getDay(); // First day is the day of the week
var last = first + 5; // last day is the first day + 6
var firstday = new Date(curr.setDate(first)).toUTCString();
var lastday = new Date(curr.setDate(last)).toUTCString();

const getEmployee = (req, res) => {
    // find method is used to select all documents from collection
    db.Employee.find({}, (err, employeeDt) => {
        res.send(employeeDt);
    });
}
const getEmployeeById = (req, res) => {
    // This find method is used to select the particular id of the collection object
    if (req.query.employeeId) {
        //var employee_id = req.query.employeeId;
        db.Employee.find({ employeeId: req.query.employeeId }, (err, employeeDt) => {
            if (!employeeDt.length > 0) {
                return res.status(404).send("The given id is not found.");
            }
            res.json(employeeDt);
        });
    }
    else if (req.query.employeeName) {
        //var employee_name = req.query.employeeName;
        db.Employee.find({ employeeName: req.query.employeeName }, (err, employeeDt) => {
            if (!employeeDt.length > 0) {
                return res.status(404).send("The given name is not found.");
            }
            res.json(employeeDt);
        });

    }
    else if (req.query.projectManagerId) {
        //var prjctManager_id = req.query.projectManagerId
        db.Employee.find({ projectManagerId: req.query.projectManagerId }, (err, employeeDt) => {
            if (!employeeDt.length > 0) {
                return res.status(404).send("The given project manager id is not found.");
            }
            res.json(employeeDt);
        });
    }
}
const postEmployee = (req, res) => {
    //hashSync is used to encrypt the data.
    const Details = {
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
    joi.validate(Details, Schema.SchemaValidation, (err, result) => {
        Details.password = bcrypt.hashSync(Details.password);
        if (err) {
            res.status(404).send("joi validation failed");
        }
        else {
            //Insert a document into a collection using create method.
            db.Employee.create(Details, (err, employeeDt) => {
                if (!employeeDt) {
                    return res.status(404).send("This id is already in use.");
                }
                res.json(employeeDt);
            })
        }
    })
}
const putEmployee = (req, res) => {
    // To update a document in a collection we use updateOne method
    if (req.query.employeeId) {
        const Details = {
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
        joi.validate(Details, Schema.employeeIdschema, (err, result) => {
            Details.password = bcrypt.hashSync(Details.password);
            if (err) {
                res.status(404).send("joi validation failed");
            }
            else {
                db.Employee.updateOne({ employeeId: req.query.employeeId }, { $set: Details }, { new: true }, (err, employeeDt) => {
                    if (employeeDt.n == 0) {
                        return res.status(404).send("There was a problem updating the employee.");
                    } else {
                        res.json(employeeDt);
                    }
                })
            }
        })
    }
    else if (req.query.employeeName) {
        const Details = {
            employeeId: req.body.employeeId,
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
        joi.validate(Details, Schema.employeeNameschema, (err, result) => {
            Details.password = bcrypt.hashSync(Details.password);
            if (err) {
                res.status(404).send("joi validation failed");
            }
            else {
                db.Employee.updateOne({ employeeName: req.query.employeeName }, { $set: Details }, { new: true }, (err, employeeDt) => {
                    if (employeeDt.n == 0) {
                        return res.status(404).send("There was a problem updating the employee.");
                    } else {
                        res.json(employeeDt);
                    }
                })
            }
        })

    }
    else if (req.query.projectManagerId) {
        const Details = {
            employeeId: req.body.employeeId,
            employeeName: req.body.employeeName,
            employeeMobileNo: req.body.employeeMobileNo,
            employeeEmailId: req.body.employeeEmailId,
            todayDate: dateFn,
            daysofworkstart: firstday,
            daysofworkend: lastday,
            Duration: duration,
            comments: req.body.comments,
            password: req.body.password
        };
        joi.validate(Details, Schema.projectManagerIdschema, (err, result) => {
            Details.password = bcrypt.hashSync(Details.password);
            if (err) {
                res.status(404).send("joi validation failed");
            }
            else {
                db.Employee.updateOne({ projectManagerId: req.query.projectManagerId }, { $set: Details }, { new: true }, (err, employeeDt) => {
                    if (employeeDt.n == 0) {
                        return res.status(404).send("There was a problem updating the employee.");
                    } else {
                        res.json(employeeDt);
                    }
                })
            }
        })

    }
}
const delEmployee = (req, res) => {
    //To delete a document in a collection we use deleteOne method.
    if (req.query.employeeId) {
        db.Employee.deleteOne({ employeeId: req.query.employeeId }, (err, employeeDt) => {
            // if (employeeDt.n == 0) {
            //     return res.status(404).send("The given id is not found for delete request.");
            // }
            if(err){
                return res.status(404).send("The given id is not found for delete request.");
            }
            res.json(employeeDt);
        });
    }
    else if (req.query.employeeName) {
        db.Employee.deleteOne({ employeeName: req.query.employeeName }, (err, employeeDt) => {
            if (employeeDt.n == 0) {
                return res.status(404).send("The given name is not found for delete request.");
            }
            else {
                res.json(employeeDt);
            }
        });
    }
    else if (req.query.projectManagerId) {
        db.Employee.deleteOne({ projectManagerId: req.query.projectManagerId }, (err, employeeDt) => {
            if (employeeDt.n == 0) {
                return res.status(404).send("The given id is not found for delete request.");
            }
            else {
                res.json(employeeDt);
            }
        });
    }
}
module.exports = { getEmployee, getEmployeeById, postEmployee, putEmployee, delEmployee };