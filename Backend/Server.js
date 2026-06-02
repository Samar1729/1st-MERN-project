const express = require("express")
const taskRoute = require('./routes/task.route')
const {connectDB} = require('./db/db')
const cors = require('cors')

const app = express()
app.use(express.json())
// app.use(cors({
//     origin: 'http://localhost:4000'
// })) // allow request from only localhost:4000

app.use(cors()) //allow request from all origins

//task routes
app.use('/api/tasks', taskRoute)

//database & servers
connectDB().then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
});

