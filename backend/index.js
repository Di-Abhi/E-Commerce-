require('dotenv').config();
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const authRoute = require('./src/routes/authRoute')

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);   
})

app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin: process.env.CLIENT_ENDPOINT, 
    credentials: true, 
}
app.use(cors(corsOptions));

app.use('/auth',authRoute)

const PORT = 5001;

app.listen(PORT,(error)=>{
    if(error){
        console.error(`Error starting server: ${error}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
})