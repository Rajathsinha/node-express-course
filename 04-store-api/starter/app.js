require('dotenv').config()
require('express-async-errors')
//async errors

const express = require('express');
const app= express()

const connectDB= require('./db/connect')

const  productRouter= require('./routes/products')



const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware//error-handler')


//middleware

app.use(express.json())

//routes


app.get('/',(req,res)=>{
   res.send('<h1>store API</h1><a href="/api/v1/products">product route</a>')
})

app.use('/api/v1/products',productRouter)

const port= process.env.PORT || 3000
//products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const start = async()=>{
    try{
        //connect DB
       await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`RUNNING server on ${port}`))
    }
    catch(error)
    {
        console.log(error)
    }
}
start()