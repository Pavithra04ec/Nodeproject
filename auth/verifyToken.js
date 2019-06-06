var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        //jwt.verify will verify the user token when the route is accessed.
        const decoded = jwt.verify(token, config.secret);
        req.employeeData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
};