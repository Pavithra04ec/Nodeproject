var joi = require('joi');
const SchemaValidation = joi.object().keys({
    employeeId: joi.number().integer().min(1).max(100).required(),
    employeeName: joi.string().min(3).max(18).required(),
    employeeEmailId: joi.string().email().lowercase().required(),
    employeeMobileNo: joi.string().regex(/^\d{10}$/).required(),
    projectManagerId: joi.number().min(1).max(100).required(),
    todayDate: joi.date().required(),
    daysofworkstart: joi.date().required(),
    daysofworkend: joi.date().required(),
    Duration: joi.string().required(),
    comments: joi.string().min(10).max(100).required(),
    password: joi.string().min(4).required()
});
const employeeIdschema = joi.object().keys({
    employeeName: joi.string().min(3).max(18).required(),
    employeeEmailId: joi.string().email().lowercase().required(),
    employeeMobileNo: joi.string().regex(/^\d{10}$/).required(),
    projectManagerId: joi.number().min(1).max(100).required(),
    todayDate: joi.date().required(),
    daysofworkstart: joi.date().required(),
    daysofworkend: joi.date().required(),
    Duration: joi.string().required(),
    comments: joi.string().min(10).max(100).required(),
    password: joi.string().min(4).required(),
});
const employeeNameschema = joi.object().keys({
    employeeId: joi.number().integer().min(1).max(100).required(),
    employeeEmailId: joi.string().email().lowercase().required(),
    employeeMobileNo: joi.string().regex(/^\d{10}$/).required(),
    projectManagerId: joi.number().min(1).max(100).required(),
    todayDate: joi.date().required(),
    daysofworkstart: joi.date().required(),
    daysofworkend: joi.date().required(),
    Duration: joi.string().required(),
    comments: joi.string().min(10).max(100).required(),
    password: joi.string().min(4).required()
});
const projectManagerIdschema = joi.object().keys({
    employeeId: joi.number().integer().min(1).max(100).required(),
    employeeName: joi.string().min(3).max(18).required(),
    employeeEmailId: joi.string().email().lowercase().required(),
    employeeMobileNo: joi.string().regex(/^\d{10}$/).required(),
    todayDate: joi.date().required(),
    daysofworkstart: joi.date().required(),
    daysofworkend: joi.date().required(),
    Duration: joi.string().required(),
    comments: joi.string().min(10).max(100).required(),
    password: joi.string().min(4).required()
})
//module.exports = SchemaValidation;
module.exports = { SchemaValidation, employeeIdschema, employeeNameschema, projectManagerIdschema };
