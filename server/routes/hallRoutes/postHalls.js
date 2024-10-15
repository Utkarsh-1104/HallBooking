import { db } from '../../db/db.js';
import Hall from '../../schema/hallSchema.js';
import express from 'express'
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await db()
        const existingHall = await Hall.findOne({
            hall_name: req.body.hall_name
        })

        if (existingHall) {
            return res.json({
                msg: 'Hall already exists',
                status: 400
            })
        }
        const hall = await new Hall({
            hall_name: req.body.hall_name,
            hall_capacity: req.body.hall_capacity,
            hall_availability: req.body.hall_availability
        })
        await hall.save()
        return res.json({
            msg: 'hall saved',
            status: 200
        }) 
    } catch (error) {
        return res.json({
            msg: error.message,
            status: 400
        })
    }
    res.json({ msg: 'post halls' })
})

export default router;