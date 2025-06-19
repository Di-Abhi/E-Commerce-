const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const authRoute = require('./src/routes/authRoute')

app.use(express.json())

app.use(cookieParser())

app.use('/auth',authRoute)

const PORT = 5001;

app.listen(PORT,(error)=>{
    if(error){
        console.error(`Error starting server: ${error}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
})