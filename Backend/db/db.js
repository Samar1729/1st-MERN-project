const mongoose = require('mongoose')

const connectDB = async (req , res) => {
    try {
        await mongoose.connect('mongodb+srv://Samar:Samar1234@planner.ncmsp6d.mongodb.net/planner')
        console.log("connected to the database");
        
    } catch (error) {
        console.error("Database connection failed");
        
    }
}

module.exports = {
    connectDB
}