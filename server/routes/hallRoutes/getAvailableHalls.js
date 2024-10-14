import express from 'express';
import { db } from '../../db/db.js';
import Hall from '../../schema/hallSchema.js';
const router = express.Router();

router.post('/', async (req, res) => {
    const { date_from, date_to, time_from, time_to } = req.body;

    try {
        await db();
        // Find all halls
        const halls = await Hall.find({});
        const available_halls = [];

        halls.forEach(hall => {
            let isAvailable = true; // Assume hall is available unless conflict is found

            //check for special halls
            if(hall._id.toString() === "6703bfa0bdf6ef86a0ab7f51" || hall._id.toString() === "66d1fe65a58995a923a5bf56") {
                //checking in hall_booking_reqs
                hall.hall_booking_reqs.forEach(reqs => {
                    const reqDateFrom = new Date(reqs.date_from);
                    const reqDateTo = new Date(reqs.date_to);
                    const requestedDateFrom = new Date(date_from);
                    const requestedDateTo = new Date(date_to);

                    // Check if requested date overlaps with any existing booking date 
                    const datesOverlap = requestedDateFrom <= reqDateTo && requestedDateTo >= reqDateFrom;

                    if (datesOverlap) {
                        // If dates overlap, check time conflicts
                        const reqStartTime = new Date(`1970-01-01T${reqs.time_from}:00Z`);
                        const reqEndTime = new Date(`1970-01-01T${reqs.time_to}:00Z`);
                        const requestedStartTime = new Date(`1970-01-01T${time_from}:00Z`);
                        const requestedEndTime = new Date(`1970-01-01T${time_to}:00Z`);

                        // Check if requested time overlaps with any existing booking times
                        const timeOverlap = requestedStartTime < reqEndTime && requestedEndTime > reqStartTime;

                        if (timeOverlap) {
                            isAvailable = false; // Conflict found, mark as unavailable
                        }
                    }
                });

                //checking in hall_availability
                hall.hall_availability.forEach(booking => {
                    const bookingDateFrom = new Date(booking.date_from);
                    const bookingDateTo = new Date(booking.date_to);
                    const requestedDateFrom = new Date(date_from);
                    const requestedDateTo = new Date(date_to);
    
                    // Check if requested date overlaps with any existing booking date 
                    const datesOverlap = requestedDateFrom <= bookingDateTo && requestedDateTo >= bookingDateFrom;
    
                    if (datesOverlap) {
                        // If dates overlap, check time conflicts
                        const bookingStartTime = new Date(`1970-01-01T${booking.time_from}:00Z`);
                        const bookingEndTime = new Date(`1970-01-01T${booking.time_to}:00Z`);
                        const requestedStartTime = new Date(`1970-01-01T${time_from}:00Z`);
                        const requestedEndTime = new Date(`1970-01-01T${time_to}:00Z`);
    
                        // Check if requested time overlaps with any existing booking times
                        const timeOverlap = requestedStartTime < bookingEndTime && requestedEndTime > bookingStartTime;
    
                        if (timeOverlap) {
                            isAvailable = false; // Conflict found, mark as unavailable
                        }
                    }
                });
    
            } else {
                // Check for date conflicts
                hall.hall_availability.forEach(booking => {
                    const bookingDateFrom = new Date(booking.date_from);
                    const bookingDateTo = new Date(booking.date_to);
                    const requestedDateFrom = new Date(date_from);
                    const requestedDateTo = new Date(date_to);
    
                    // Check if requested date overlaps with any existing booking date 
                    const datesOverlap = requestedDateFrom <= bookingDateTo && requestedDateTo >= bookingDateFrom;
    
                    if (datesOverlap) {
                        // If dates overlap, check time conflicts
                        const bookingStartTime = new Date(`1970-01-01T${booking.time_from}:00Z`);
                        const bookingEndTime = new Date(`1970-01-01T${booking.time_to}:00Z`);
                        const requestedStartTime = new Date(`1970-01-01T${time_from}:00Z`);
                        const requestedEndTime = new Date(`1970-01-01T${time_to}:00Z`);
    
                        // Check if requested time overlaps with any existing booking times
                        const timeOverlap = requestedStartTime < bookingEndTime && requestedEndTime > bookingStartTime;
    
                        if (timeOverlap) {
                            isAvailable = false; // Conflict found, mark as unavailable
                        }
                    }
                });
            }

            // If no conflicts (both date and time), push hall to available_halls
            if (isAvailable) {
                available_halls.push(hall);
            }
        });

        res.status(200).json({ available_halls });

    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

export default router;
