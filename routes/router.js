//route are guide they tell the client to go to which controller once a path/url is requested.

const express = require('express');
//router object include methods for routing http request.
const router = express();
const controller = require('../controllers/controller');
const verifyToken = require("../auth/verifyToken");

// use method tell the router we can use verifytoken. 
//router.use(verifyToken);

// This is used to read all objects in a collection.
router.get('/api', controller.getEmployee);

// This is used to read the objects of specified Id in a collection.
router.get('/api/Employee', controller.getEmployeeById);

// This is used to create a new object in a collection.
router.post('/api', controller.postEmployee);

// This is used to update an existing object in a collection.
router.put('/api/Employee', controller.putEmployee);

// This is used to delete the object of a specified Id in a collection.
router.delete('/api/Employee', controller.delEmployee);

module.exports = router;

