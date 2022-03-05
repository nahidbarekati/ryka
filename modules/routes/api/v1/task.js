const express = require('express');

const  {api : ControllerApi } = path.controllers;

//Controllers
const taskController = require(`${ControllerApi}/v1/TasksController`);

//Middlewares
const UserAuth = require('../../../middleware/api/v1/UserAuth');

//Validator
const validator = require("../../../Validators/validators");

//Routes With Model Binding
const router = express.Router();


/********************
 * USERS ROUTES START
 ********************************************************/


//ALL task Show
router.get('/task/:page?/:order?/:limit?', UserAuth, taskController.index);


router.post('/task/create', UserAuth, validator.validate(validator.createTask), taskController.createTask);
router.put('/task/status/:id', UserAuth, taskController.changeStatus);


/********************
 * USERS ROUTES END
 ********************************************************/


module.exports = router;