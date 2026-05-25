const express = require("express")
const taskRoute = require('./routes/task.route')
const {connectDB} = require('./db/db')

const app = express()
app.use(express.json())

//task routes
app.use('/api/tasks', taskRoute)

//database & servers
connectDB().then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
});

