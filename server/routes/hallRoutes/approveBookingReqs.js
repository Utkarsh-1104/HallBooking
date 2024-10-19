import express from "express";
import { db } from "../../db/db.js";
import Hall from "../../schema/hallSchema.js";
import sendEmail from "../../controller/emailService.js";
const router = express.Router();

// Route to move a booking request to hall availability
router.put('/', async (req, res) => {
  try {
    const { hall_name, reqId, superadmin_name } = req.body;

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

    const subject = `Your booking request ${bookingRequest.hall_name} has been approved by ${superadmin_name}`;
    const htmlContent = `
      <h1>Congratulations! Your spot has been reserved.</h1>
      <h3>Event: ${bookingRequest.event_name}</h3>
      <h3>Date: ${bookingRequest.date_from} to ${bookingRequest.date_to}</h3>
      <h3>Time: ${bookingRequest.time_from} to ${bookingRequest.time_to}</h3>
      <h3>Participants: ${bookingRequest.number_of_attendees} </h3>
      <h3>Hall Name: ${bookingRequest.hall_name} </h3>
      <h3>Hall Building: ${bookingRequest.hall_building} </h3>
      <h3>Hall College: ${bookingRequest.hall_college} </h3>
    `;

    await sendEmail(bookingRequest.username, subject, htmlContent);

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
