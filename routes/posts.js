const express = require('express');
let router = express.Router();
const fs = require('fs');
const path = require('path');

store = {};

function readJSON(){
    store = JSON.parse(fs.readFileSync(path.join(__dirname, '../store.json')));
}

function writeJSON(data){
    fs.writeFile(path.join(__dirname, '../store.json'), JSON.stringify(data),(err)=>{
        if(err){
            console.log(err);
        }
    })
}

router.get('/', (req,res,next)=>{
    readJSON();
    res.status(200).send(
        JSON.stringify(store,null, 3));
    next();
});

router.post('/', (req,res,next)=>{
    readJSON();
    store.posts.push(req.body);
    writeJSON(store);
    res.send("DONE\n");
    next();
});

router.put('/:postId/', (req,res,next)=>{
    readJSON();
    Object.assign(store.posts[req.params.postId], req.body);
    writeJSON(store);
    res.send("DONE\n");
    next();
});

router.delete('/:postId/', (req,res,next)=>{
    readJSON();
    store.posts.splice(req.params.postId, 1);
    res.send("DONE\n");
    writeJSON(store);
    next();
});

module.exports=router;