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

router.get('/:postId/comments', (req,res,next)=>{
    readJSON();
    res.status(200).send(
        JSON.stringify(store.posts[req.params.postId], null, 2));
    next();
});

router.post('/:postId/comments', (req,res,next)=>{
    readJSON();
    store.posts[req.params.postId].comments.push(req.body);
    writeJSON(store);
    res.send("DONE\n");
    next();
});

router.put('/:postId/comments/:commentId', (req,res,next)=>{
    readJSON();
    Object.assign(store.posts[req.params.postId].comments[req.params.commentId], req.body);
    writeJSON(store);
    res.send("DONE\n");
    next();
});

router.delete('/:postId/comments/:commentId', (req,res,next)=>{
    readJSON();
    store.posts[req.params.postId].comments.splice(req.params.commentId, 1);
    res.send("DONE\n");
    writeJSON(store);
    next();
});

module.exports=router;