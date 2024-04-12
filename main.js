const express = require('express');
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect("mongodb://127.0.0.1:27017/level5_tasks_management")
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
.catch(error => {
    throw new Error("Database error: " + error)
});



