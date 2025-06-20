const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoute = require('./src/routes/authRoute')

app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:5173', 
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