const http = require('http');
const express = require('express');

const app = express();

//add a new middleware function that will be executed in every incoming request
app.use((req, res, next) => {
    console.log("In the middleware!");
    next(); // Allows the request to continue to the next middleware in line
})

app.use((req, res, next) => {
    console.log("In another middleware!");
    res.send('<h1>Hello!</h1>') // Sends a response back to the browser (new utility function)
})

const server = http.createServer(app);

const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})