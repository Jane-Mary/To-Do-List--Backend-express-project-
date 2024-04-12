const express = require('express');
const port = process.env.PORT;
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// const dotenv = require('dotenv);
// dotenv.config()

mongoose.connect(process.env.DATABASE_URL)
.then(connection => {
    const app = express()
    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({ extended: false}))

   
    const indexRoute = require('./Routes/index.route');
     const tasksRoute = require('./Routes/tasks.route');
     const authRoute = require('./Routes/auth.route');

    app.use('/', indexRoute);//All routes called above begin with /
    app.use('/tasks', tasksRoute);
    app.use('/auth', authRoute)

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    })

})
// .catch(error => {
//     throw new Error("Database error: " + error)
// });



