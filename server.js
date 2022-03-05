const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
global.path = require('./modules/paths')
const env = require('dotenv').config()
const path2 = require('path');

global.appRoot = path2.resolve(__dirname);




//connect To DB
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE }`, {useUnifiedTopology: true, useNewUrlParser: true } );


mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json({type : 'application/json'}))



app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, x-access-token, Accept, Authorization");
    next();
});

const apiRouter = require('./modules/routes/api');



app.use('/api' , apiRouter);

app.use('/' , express.static('public'));

app.listen(process.env.PORT , () => {
    console.log(`server Running at Port ${process.env.PORT}`)
})