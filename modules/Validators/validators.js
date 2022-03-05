// const { check } = require('express-validator/check');
const { body ,param, validationResult} = require('express-validator');

exports.createUser = [

    body('name', 'فیلد نام الزامی می باشد').not().isEmpty(),
    body('password', 'فیلد کلمه عبور الزامی می باشد').escape(),
    body('email', 'لطفا یک ایمیل معتبر وارد نمایید').isEmail(),
    body('password', 'فیلد کلمه عبور الزامی می باشد').not().isEmpty(),
    body('password', 'کلمه عبور نباید کمتر از 8 کاراکتر باشد').isLength({ min: 8 }),
        // body('password', 'کلمه عبور نباید کمتر از 5 کاراکتر باشد').not().isLength({ min: 5 }),
        ];

exports.loginUser = [
    body('email', 'لطفا یک ایمیل معتبر وارد نمایید').isEmail().not().isEmpty(),
    body('password', 'فیلد کلمه عبور الزامی می باشد').not().isEmpty(),
];

exports.createTask = [
    body('title', 'عنوان  نباید خالی از مقدار باشد').not().isEmpty(),
    body('description', 'توضیحات  نباید خالی از مقدار باشد').not().isEmpty(),
];


exports.showUser = [
        param('id' , 'آی دی وارد شده صحیح نیست.').isMongoId()
]




        // can be reused by many routes
exports.validate = validations => {
        return async (req, res, next) => {
          await Promise.all(validations.map(validation => validation.run(req)));
      
          const errors = validationResult(req);
          if (errors.isEmpty()) {
            return next();
          }
          
          return res.status(422).json({ 
                message: errors.array().map(error => {
                        return {
                            'field': error.param,
                            'message': error.msg,
                        }
                    }),
                    success: false
           });
        };
      };
