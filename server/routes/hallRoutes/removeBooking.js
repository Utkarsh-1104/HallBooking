import express from 'express'
import { db } from '../../db/db.js'
import Hall from '../../schema/hallSchema.js'
import e from 'express'
const router = express.Router()

router.post('/:id', async (req, res) => {
    const id = req.params.id
    const booking_id = req.body.booking_id
    try {
        const result = await Hall.updateOne(
            {_id: id},
            {
                $pull: {
                    hall_availability: {
                        booking_id: booking_id
                    }
                }
            }
        )
        if (result.modifiedCount > 0) {
            res.json({
                msg: 'Booking removed successfully',
                status: 200
            })
        } else {
            res.json({
                msg: 'No matching booking found.',
                status: 404
            })
        }
    } catch (error) {
        res.json({
            msg: "Some error occured. Couldn't remove booking",
            status: 400
        })
    }
})

export default router