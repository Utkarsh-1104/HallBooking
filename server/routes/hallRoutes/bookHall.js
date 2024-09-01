import express from "express";
import { db } from "../../db/db.js";
import Hall from "../../schema/hallSchema.js";
const router = express.Router();

router.patch('/:date', async (req, res) => {
    const date = req.params.date
    try {
        await db()
        const all_halls = await Hall.find()
        let hall_bookings = []
        all_halls.map(hall => {
            hall.hall_availability.map(booking => {
                hall_bookings.push(booking)
            })
        })
        res.send(hall_bookings)
        // await Hall.updateOne (
        //     { 
        //         hall_name: req.params.name 
        //     }, 
        //     { 
        //         "$push": {
        //             hall_availability: req.body 
        //         }
        //     }
        // )
        // return res.json({
        //     msg: 'hall updated',
        //     status: 200
        // })  
    } catch (error) {
        return res.json({
            msg: error.message,
            status: 400
        })
    }
    res.json({ msg: 'patch halls' })
})

export default router;