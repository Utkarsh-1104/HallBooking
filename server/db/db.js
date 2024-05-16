require('dotenv').config()
const mongoose = require('mongoose')

export default async function db() {
    await mongoose.connect(URI)
    console.log('Connected to database')   
}