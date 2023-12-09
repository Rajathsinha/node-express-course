require('dotenv').config()

const mongoose = require('mongoose');


const connectDB = require('./db/connect');

const product = require('./models/product');

const productsJSon = require('./products.json');



const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        await product.deleteMany()
        await product.create(productsJSon)
        console.log('SUCCESS!!')
        process.exit(0)
    }catch(error){
        console.log(error)
        process.exit(1)                                         

    }
}

start()