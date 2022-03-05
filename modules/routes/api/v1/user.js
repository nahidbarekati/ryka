const express = require('express');
const validator = require("../../../Validators/validators");

const  {api : ControllerApi } = path.controllers;


//Controllers
const AuthController = require(`${ControllerApi}/v1/AuthController`);




/********************************************************
 * USERS METHODS START
 ********************/


//Routes With Model Binding
const router = express.Router();


//Authentication
router.post('/login', AuthController.login.bind(AuthController));


router.post('/register' ,validator.validate(validator.createUser) , AuthController.register.bind(AuthController));


/********************
 * USERS METHODS END
 ********************************************************/


module.exports = router;