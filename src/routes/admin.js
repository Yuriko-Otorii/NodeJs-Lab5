const express = require('express');

const router = express.Router();

//filter from a more specific path
router.get('/add-member', (req, res, next) => {
    res.send(`
        <form action="/member" method="POST">
            <input type="text" name="name" placeholder="Name">
            <button type="submit">Add Member</button>
        </form>
    `)
})

//limiting middleware to execute a POST request
router.post('/member', (req, res, next) => {
    console.log("Name is: ", req.body.name);
    res.redirect('/')
})

module.exports = router;