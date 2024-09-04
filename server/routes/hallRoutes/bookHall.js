import express from "express";
import { db } from "../../db/db.js";
import Hall from "../../schema/hallSchema.js";
const router = express.Router();

router.patch('/:date', async (req, res) => {
    const Req_date = req.params.date
    try {
        await db()
        const all_halls = await Hall.find()
        let available_halls = []
        all_halls.map(hall => {
            hall.hall_availability.map(booking => {
                available_halls = hall.hall_availability.filter(booking => booking.date !== Req_date)
            })
        })
        available_halls = 
        res.send(available_halls)
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
    //res.json({ msg: 'patch halls' })
})

export default router;