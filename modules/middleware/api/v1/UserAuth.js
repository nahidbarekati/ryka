const datetime = require("jalali-moment");
const jwt = require('jsonwebtoken');
const User = require(`${path.model}/User`);


module.exports = async (req , res ,next ) =>  {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token;

    if(token) {
        return jwt.verify(token , process.env.SECRET , (err , decode ) => {
            // console.log(decode);

            if (!decode){
                return res.json({
                    message : 'User not found',
                    status : false
                });
            }

            const {user_id} = decode ;//decode.user_id
            if (user_id){
                // {$set:{lastLogin:datetime.now()}}
                 User.findByIdAndUpdate( user_id ,{'lastLogin' : datetime.now()}, (err , user) => {
                    if(err) throw err;

                    if(user) {
                        // user.token = token;
                        req.user = user;
                        global.userLogged = user
                        // console.log(req.user.name);
                        next();

                    } else {
                        return res.json({
                            error : 'Authentication Error',
                            message : 'کاربری با این مشخصات وجود ندارد',
                            status : 'error:2'
                        });
                    }

                })

                 .populate({//IF WithStatus IS True

                     path: 'tasks',
                         // match: { key: req.params.categoryKey },
                         options: {
                             sort: { created : -1 },
                             limit: 30
                         }
                     })
                
            }



        })
    }

    return res.json({
        data : 'No Token Provided',
        success : false
    })
}