const path = require('path');

module.exports = {
                controllers : {
                        api : path.resolve('./modules/controllers/api'),
                },
                model : path.resolve('./modules/models'),
                transform : path.resolve('./modules/transforms'),
                controller : path.resolve('./modules/controllers/Controller'),
                helpers : path.resolve('./modules/helpers'),
}