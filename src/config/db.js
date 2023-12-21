const mongoose = require('mongoose');
const { mongoDbUrl } = require('../secret');

const connectDB = async (options ={})=>{
    try {
        await mongoose.connect(mongoDbUrl,options)
       console.log("connected to database successfully");
        mongoose.connection.on('error',(error)=>{
            console.error('database connection error:', error)
        });
    } catch (error) {
       console.error('could not connect to database:', error.toString()) 
    }
};

module.exports =connectDB;