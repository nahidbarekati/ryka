const express = require('express');
const router = express.Router();


router.all('*' , async (req , res , next) => {
    try {
        res.statusCode = 404;
        return  res.json({
            message:'چنین صفحه ای یافت نشد',
            status : 404
        })
    } catch(err) {
        next(err)
    }
});


router.use((err , req , res , next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || '';
    const stack = err.stack || '';

    const layouts = {
        extractScripts : false,
        extractStyles : false
    }

    if(config.debug) return res.json({
        message: 'ارور از سمت سرور'
    });
})

module.exports = router;