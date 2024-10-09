import express from 'express';
import { db } from '../../db/db.js';
import Hall from '../../schema/hallSchema.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await db()
        const halls = await Hall.find().sort({ updatedAt: -1 });
        const bookingReqs = halls.map(hall => hall.hall_booking_reqs)
        
        return res.json({
            bookingReqs,
            status: 200
        })
        
    } catch (error) {
        return res.json({
            msg: 'Error while fetching booking requests.',
            status: 500
        })
    }
})

export default router