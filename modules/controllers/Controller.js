
//Model
const User = require(`${path.model}/User`);
const Task = require(`${path.model}/Task`);

const { check, validationResult } = require('express-validator');
const isMongoId = require('validator/lib/isMongoId');


module.exports = class Controller {

    constructor(){
        this.model = {User,Task}

        
    }

    async validationData(req,res) {
        const result = validationResult(req);
        if (! result.isEmpty()) {
            const errors = result.array();
            const messages = [];
            errors.forEach(err => messages.push(err.msg));
            req.errors = messages;
            // req.flash('errors' , messages)

            

            await  res.json({
                message : messages,
                status : 'validation'
            }).end()

            return false;

        }

        return true;
    }



    isMongoId(paramId,res) {
        if(! isMongoId(paramId)){
             res.json({
                message : 'ای دی وارد شده صحیح نیست',
                status : 'validation' }).end();
            return false;
        }
        return true;
    }


}
