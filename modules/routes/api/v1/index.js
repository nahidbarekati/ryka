const express = require('express');
const router = express.Router();


//Routers Call
const TaskRouter = require('./task');
const UserRouter = require('./user');




//Status Routers
router.use(TaskRouter);

//User Routers
router.use(UserRouter);



//REGISTER DEVICE BY TOKEN
// router.get('/device/:token', AuthController.device.bind(AuthController));


module.exports = router;