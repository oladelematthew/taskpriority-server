var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Task = sequelize.import('../models/task');
var validateSession = require('../middleware/validate-session');


// /tasks/ first route
router.get('/', (req, res) => res.send('Create tasks'));

//Get All
router.get('/all', (req, res) =>{
    Task.findAll()
        .then(tasks =>res.status(200).json(tasks))
        .catch(err => res.status(500).json(err));
});

router.post('/', validateSession, (req, res) => {
    if (!req.errors){
        const taskFromRequest = {
            taskName: req.body.taskName,
            dueDate: req.body.dueDate,
            timeOfTask: req.body.timeOfTask,
            priority: req.body.priority,
            taskCompleted: req.body.taskCompleted
        };
// console.log(taskFromRequest)

        Task.create(taskFromRequest)
            .then(newTask => res.status(200).json(newTask))
            .catch(err =>res.json(err));
    } else{
        res.status(500).json(req.errors)
    }
})

//Get Task by Name
router.get('/:searchTask', (req, res) =>{
    Task.findOne({where: {taskName: req.params.searchTask}})
        .then(task => res.status(200).json(task))
        .catch(err => res.status(500).json(err));
});

//Update by id
router.put('/:searchId', validateSession, (req, res) =>{
    if(!req.errors){
        Task.update(req.body, {where: {id: req.params.searchId}})
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err));
    } else{
        res.status(500).json(req.errors);
    }
})

//Delete by id
router.delete('/:searchId', validateSession, (req, res) =>{
    if(!req.errors){
        Task.destroy({where: {id: req.params.searchId}})
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    } else{
        res.status(500).json(req.errors)
    }
})

// /tasks/manage 2nd route
router.get('/manage', (req, res) => res.send('manage tasks, track task progress'));

module.exports = router;