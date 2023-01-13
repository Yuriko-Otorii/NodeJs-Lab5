const express = require('express');
const path = require('path');

const rootDir = require('../utils/path-helper');

const router = express.Router();

//dynamic route
// router.get('/:greet', (req, res, next) => {
//     console.log(req.params.greet);
//     res.send(`<h1>Hello ${req.params.greet}</h1>`)
// })

router.get('/', (req, res, next) => {
    // console.log(path.join('../templates/homepage.html'))
    // res.send('<h1>Hello from Express!</h1>');
    // res.sendFile('/Users/francoispolo/Desktop/Lab/A-0522/NodeJS/W1/D3/express-recipes/src/template/homepage.html')
    // res.sendFile(path.join(__dirname, '..', 'template' , 'homepage.html'))
    res.sendFile(path.join(rootDir, 'template' , 'homepage.html'))
})

module.exports = router;