import express from "express";
import { db } from "../../db/db.js";
import Hall from "../../schema/hallSchema.js";
const router = express.Router();

router.get('/:date:time_from:time_to', async (req, res) => {
    const { date, time_from, time_to } = req.query;

    try {
        // Find all halls
        const halls = await Hall.find({});
        const available_halls = [];

        halls.forEach(hall => {
            const isAvailable = hall.hall_availability.every(booking => {
                // Check if the booking date matches and there is a time overlap
                if (booking.date === date) {
                    const existingStart = new Date(`1970-01-01T${booking.time_from}:00Z`);
                    const existingEnd = new Date(`1970-01-01T${booking.time_to}:00Z`);
                    const requestedStart = new Date(`1970-01-01T${time_from}:00Z`);
                    const requestedEnd = new Date(`1970-01-01T${time_to}:00Z`);

                    // Check for time overlap
                    if ((requestedStart < existingEnd && requestedEnd > existingStart)) {
                        return false; // Conflict found, hall is not available
                    }
                }
                return true; // No conflict, hall is available
            });

            if (isAvailable) {
                available_halls.push(hall);
            }
        });

        res.status(200).json({ available_halls });

    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
})

export default router;