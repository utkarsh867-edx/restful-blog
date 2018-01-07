const express = require('express')
let app = express();
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const fs = require('fs');
const path = require('path');
const posts = require('./routes/posts');
const comments = require('./routes/comments');


let store = {
    posts: [
        {
            name: 'Top 10 ES6 Features every Web Developer must know',
            url: 'https://webapplog.com/es6',
            text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
            comments: [
                {text: 'Cruel…..var { house, mouse} = No type optimization at all'},
                {text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
                {text: '(p1,p2)=>{ … } ,i understand this ,thank you !'}
            ]
        }
    ]
}

app.use(bodyParser.json());
app.use(errorhandler());

app.use((req,res,next)=>{
    if(fs.existsSync('./store.json')){
        store = JSON.parse(fs.readFileSync('./store.json'));
    }
    next();
});

app.use((req,res,next)=>{
    fs.writeFileSync('./store.json',JSON.stringify(store));
    next();
});

app.use('/posts', posts);
app.use('/posts', comments);

app.listen(3000);