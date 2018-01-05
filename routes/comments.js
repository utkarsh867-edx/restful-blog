const express = require('express');
let router = express.Router();

router.get('/', (req,res,next)=>{
    res.statusCode(200).send("Hello");
    next();
});

module.exports = router;