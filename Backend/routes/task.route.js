const express = require("express")
const router = express.Router()
const { getAllTask } = require('../controllers/task.controller')
const { getSingleTask, createNewTask, updateSingleTask, deleteSingleTask } = require('../controllers/task.controller')


// getting all the tasks
router.get('/', getAllTask)

//get a single task
router.get('/:id', getSingleTask)

//create a new task
router.post('/', createNewTask)

//update a task 
router.put('/:id', updateSingleTask)

//delete a task
router.delete('/:id', deleteSingleTask)

module.exports = router