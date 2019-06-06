//models will include all the code for our database model.

const mongoose = require('mongoose');
// we will create our model.
var employeeSchema = new mongoose.Schema({
    employeeId: { type: Number, required: true, unique: true },
    employeeName: { type: String, required: true },
    employeeMobileNo: { type: String, required: true },
    employeeEmailId: { type: String, required: true },
    projectManagerId: { type: Number, required: true },
    todayDate: { type: Date, required: true },
    daysofworkstart: { type: Date, required: true },
    daysofworkend: { type: Date, required: true },
    Duration: { type: String, required: true },
    comments: { type: String, required: true },
    password: { type: String, required: true }
});

var Employee = mongoose.model('Employee', employeeSchema);
module.exports = { Employee }
