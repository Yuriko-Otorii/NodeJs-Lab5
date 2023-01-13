const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const recipeRoutes = require('./routes/recipe');

const app = express();

// app.use((req, res, next) => {
//     console.log("In the middleware!");
//     next();
// })
// app.use((req, res, next) => {
//     console.log("In another middleware!");
//     res.send('<h1>Hello from Express!</h1>')
// })

//pass the config option of extended and set to false to parse only with the default features
app.use(bodyParser.urlencoded({extended: false}))

//routes
app.use('/admin', adminRoutes);
app.use(recipeRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
