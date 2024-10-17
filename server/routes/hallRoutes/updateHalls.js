import express from 'express';
import { db } from '../../db/db.js';
import Hall from '../../schema/hallSchema.js';
const router = express.Router();

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await db() 
        const hallToBeUpdated = await Hall.findOne({_id: id})
        if (!hallToBeUpdated) {
            return res.json({
                msg: 'Hall not found',
                status: 404
            })
        }
        await Hall.updateOne(
            {
                _id: id
            },
            {
                "$set": {
                    hall_name: req.body.hall_name || hallToBeUpdated.hall_name,
                    hall_capacity: req.body.hall_capacity || hallToBeUpdated.hall_capacity,
                    college: req.body.college || hallToBeUpdated.college,
                    building: req.body.building || hallToBeUpdated.building
                }
            }
        )
        return res.json({
            msg: 'hall details updated',
            status: 200
        })
    } catch (error) {
        res.json({
            msg: "hall not updated",
            status: 400
        })
    }
})

export default router