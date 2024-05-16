const mongoose = require('mongoose')
const { db } = require('../db/db')

async function adminSchema() {
    try {
        await db()
        const adminSchema = new mongoose.Schema({
            username: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        })
    } catch (error) {
        console.log('error');
    }
}

export const Admin = mongoose.model('Admin', adminSchema)