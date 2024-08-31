import express from 'express'
import { db } from '../../db/db.js'
import Hall from '../../schema/hallSchema.js'
const router = express.Router()

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await Hall.updateOne(
            {_id: id},
            {
                $pull: {
                    hall_availability: {
                        _id: req.body.booking_id
                    }
                }
            }
        )
        if (result.modifiedCount > 0) {
            console.log('Booking removed successfully.');
        } else {
            console.log('No matching booking found.');
        }
    } catch (error) {
        res.json({
            msg: "Some error occured. Couldn't remove booking",
            status: 400
        })
    }
})