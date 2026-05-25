const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'This field is required']
    },

    taskDone: {
        type: Boolean,
        required: true,
    },

    color: {
        type: String,
        enum: ['red', 'blue', 'pink', 'yellow', 'green', 'gray'],
        default: 'gray',
    },
},
    {
        timestamps: true,
    }
)

const Task = mongoose.model("Task", TaskSchema)

module.exports = Task
