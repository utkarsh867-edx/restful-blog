const express = require('express')
let app = express();
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');

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
const posts = require('./routes/posts')(store);
const comments = require('./routes/comments');


app.use(bodyParser.json());
app.use(errorhandler());
app.use('/posts', posts);
app.use('/posts/:id/comments', comments);

app.listen(3000);