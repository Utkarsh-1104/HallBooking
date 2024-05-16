const mongoose = require('mongoose')
const { db } = require('../db/db')

async function hallSchema() {
    try {
        await db()
        const await hallSchema = new mongoose.Schema({
            hall_name: {
                type: String,
                required: true
            },
            hall_capacity: Number,
            hall_availability: [String]
        })
        
    } catch (error) {
        console.log('Server down.');
    } 

}

export const Hall = mongoose.model('Hall', hallSchema)