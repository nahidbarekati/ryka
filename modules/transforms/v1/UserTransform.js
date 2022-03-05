const Transform = require('../Transform');
const jwt = require('jsonwebtoken');
const User = require(`${path.model}/Task`);

const moment = require('jalali-moment');
moment().locale('fa').format('YYYY/M/D');

let UserTransform = class UserTransform extends Transform {

    transform(item,createToken = false) {

        this.createToken = createToken;

        return {
            user: {
                'id' : item._id,
                'name' : item.name,
                'email' : item.email,
            },
            ...this.withToken(item),

        }
    }

    withToken(item) {

        if (item.token) return { token : item.token};

        if(this.createToken === true){

            let token =  jwt.sign({ user_id : item._id} , process.env.SECRET,{
                expiresIn: '110h',
                // algorithm: 'RS256'
            });
            return  {
                "access_token": token,
                "token_type": "bearer",
                "expires_in": '110h'
            }
        }
        return {};
    }
}

module.exports = {UserTransform }