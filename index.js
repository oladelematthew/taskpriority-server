require('dotenv').config();
var express = require('express');
var taskController = require('./controllers/taskController');
var userController = require('./controllers/userController');

var db = require('./db');
db.sync();

var app = express();

app.use(require('./middleware/headers'))

app.use(express.json());

app.use('/tasks', taskController);

app.use('/user', userController);

app.listen(process.env.PORT, () => {
    console.log(`taskPriority spinning on ${process.env.PORT}`)
});