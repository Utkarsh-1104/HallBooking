import express from 'express';
import { db } from '../../db/db.js';
import Hall from '../../schema/hallSchema.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await db()
        const halls = await Hall.find()
        
    } catch (error) {
        
    }
})