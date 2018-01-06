const express = require('express');
let router = express.Router();
data={};
router.get('/', (req,res,next)=>{
    res.status(200).send(data);
    next();
});

router.get('/:id', (req,res,next)=>{
    res.status(200).send(data.posts[req.params.id]);
    next();
});

module.exports = function(store){
    data = store;
    return router;
}