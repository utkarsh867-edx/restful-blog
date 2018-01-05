const express = require('express');
let router = express.Router();

data={};
router.get('/', (req,res,next)=>{
    res.send(data);
    next();
});

module.exports = function(store){
    data = store;
    return router;
}