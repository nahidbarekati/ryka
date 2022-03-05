const Controller = require(`${path.controller}`);
const {UserTransform} = require(`${path.transform}/v1/UserTransform`)
const bcrypt = require('bcrypt');

module.exports = new class AuthController extends Controller {

    register(req, res) {

        //Password Hashing then registering
        bcrypt.hash(req.body.password, 10, (err, hash) => {

           
            this.model.User({
                name: req.body.name,
                password: hash,
                email: req.body.email,
            }).save(err => {
                if (err) {
                    if (err.code === 11000) {
                        return res.json({
                            message: 'ایمیل وارد شده قبلا در سایت ثبت نام کرده است.',
                            status : 'validation'
                        });
                    } else {
                        throw err;
                    }
                }
                res.json({
                    message: 'ثبت نام با موفقیت انجام شد.',
                    status: 'success'
                });
            })

        });


    }

    async login(req, res) {
        //Validate Response
        let RequestValidator = await this.validationData(req,res);
        if (!RequestValidator) return ;


        await this.model.User.findOne({ $or: [{email: req.body.email}] }, async (err, user) => {

            
            if (!user){
                return res.json({
                    message : 'ایمیل وارد شده صحیح نمی باشد',
                    status : 'error',
                })

            }

            if (user){
                bcrypt.compare(req.body.password , user.password , (err , success) => {
                    if(!success){
                        return res.json({
                            message : 'پسورد وارد شده صحیح نمی باشد',
                            status : 'error',
                        }).end()
                    }
                    
                    return res.status(200).json({
                        message : `عزیز با موقییت لاگین شدید ${user.name }`,
                        ...new UserTransform().transform(user,true),
                        status: 'success',
                    });

                })
                
            }

        }).then(user => {

            if (!user) return res.json({
                    message: 'اطلاعات وارد شده صحیح نیست',
                    status: '404',
                });

        })


    }

    async logout(req, res) {

        req.user.deleteToken(req.token,(err,user)=>{
            if(err) return res.status(400).send(err);
            res.sendStatus(200);
        });

    }

}
