const Task = require('../Models/task.model')

//get all the tasks

const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get a single task

const getSingleTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//create a new task

const createNewTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update a particular task

const updateSingleTask = async (req, res) => {
    try {

        const task = await Task.findByIdAndUpdate(req.params.id, req.body)

        if (!task) {
            return res.status(404).json({ message: "Task nhi mila" })
        }

        const updatedTask = await Task.findById(req.params.id)

        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//delete a task

const deleteSingleTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).json({ message: "Task nhi mila" })
        }

        res.status(200).json({ message: "ho gya delete" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//delete all tasks

const deleteAllTasks = async (req , res) => {
    try {
        await Task.deleteMany({})
        res.status(200).json({ message : "All Tasks deleted"})
    } catch (error) {
        res.status(500).json({ message : error.message})        
    }
}


module.exports = {
    getAllTask,
    getSingleTask,
    createNewTask,
    updateSingleTask,
    deleteSingleTask,
    deleteAllTasks
}