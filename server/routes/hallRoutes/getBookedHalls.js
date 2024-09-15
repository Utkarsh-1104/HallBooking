import express from 'express';
import { db } from '../../db/db.js';
import Hall from '../../schema/hallSchema.js';
const router = express.Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await db();
        const halls = await Hall.find();
        const hallsBookedByAdmin = [];

        halls.forEach(hall => {
            let bookedHall = {}
            hall.hall_availability.forEach(booking => {
                if (booking.admin_booking_id === id) {
                    bookedHall = {
                        hall_id: hall._id,
                        hall_name: hall.hall_name,
                        hall_capacity: hall.hall_capacity,
                        hall_bookings: booking
                    }
                    hallsBookedByAdmin.push(bookedHall);
                }
            })
        })

        return res.json({
            status: 200,
            hallsBookedByAdmin
        })
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
    
})

export default router;