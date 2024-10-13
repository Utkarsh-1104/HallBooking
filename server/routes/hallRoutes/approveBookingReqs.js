import express from "express";
import { db } from "../../db/db.js";
import Hall from "../../schema/hallSchema.js";
const router = express.Router();

// Route to move a booking request to hall availability
router.put('/', async (req, res) => {
  try {
    const { hall_name, reqId } = req.body;

    // Find the hall by ID
    const hall = await Hall.findOne({hall_name: hall_name});
    if (!hall) {
        return res.json({
            message: 'Hall not found.',
            status: 404
        });
    }
    // Find the booking request in hall_booking_reqs array
    const bookingReqIndex = hall.hall_booking_reqs.findIndex(req => req._id.toString() === reqId);
    if (bookingReqIndex === -1) {
        return res.json({
            message: 'Booking request not found.',
            status: 404
        });
    }

    // Get the booking request
    const bookingRequest = hall.hall_booking_reqs[bookingReqIndex];

    // Remove the booking request from hall_booking_reqs
    hall.hall_booking_reqs.splice(bookingReqIndex, 1);

    // Push the same booking request to hall_availability
    hall.hall_availability.push(bookingRequest);

    // Save the updated hall document
    await hall.save();

    return res.json({
        message: 'Booking request approved.',
        status: 200
    });
  } catch (error) {
    console.error(error);
    return res.json({
        message: 'An error occured. Please try again.',
        status: 500
    });
  } 
});

export default router;
