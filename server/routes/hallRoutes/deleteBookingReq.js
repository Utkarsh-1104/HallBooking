import express from "express";
import { db } from "../../db/db.js";
import Hall from "../../schema/hallSchema.js";
import sendEmail from "../../controller/emailService.js";
const router = express.Router();

router.put('/', async (req, res) => {
    const { hall_name, reqId, superadmin_name } = req.body;

    try {
        await db();
        const hall = await Hall.findOne({hall_name: hall_name});
        if (!hall) {
            return res.json({
                message: 'Hall not found.',
                status: 404
            });
        }
        const bookingReqIndex = hall.hall_booking_reqs.findIndex(req => req._id.toString() === reqId);
        if (bookingReqIndex === -1) {
            return res.json({
                message: 'Booking request not found.',
                status: 404
            });
        }
        
        const subject = `Your booking request at ${hall.hall_booking_reqs[bookingReqIndex].hall_name} has been declined by ${superadmin_name}.`;
        
        const htmlContent = `
            <h1>Sorry! Your booking request has been declined.</h1>
            <h3>Event: ${hall.hall_booking_reqs[bookingReqIndex].event_name}</h3>
            <h3>Date: ${hall.hall_booking_reqs[bookingReqIndex].date_from} to ${hall.hall_booking_reqs[bookingReqIndex].date_to}</h3>
            <h3>Time: ${hall.hall_booking_reqs[bookingReqIndex].time_from} to ${hall.hall_booking_reqs[bookingReqIndex].time_to}</h3>
            <h3>Participants: ${hall.hall_booking_reqs[bookingReqIndex].number_of_attendees} </h3>
            <h3>Hall Name: ${hall.hall_booking_reqs[bookingReqIndex].hall_name} </h3>
            <h3>Hall Building: ${hall.hall_booking_reqs[bookingReqIndex].hall_building} </h3>
            <h3>Hall College: ${hall.hall_booking_reqs[bookingReqIndex].hall_college} </h3>
        `
        await sendEmail(hall.hall_booking_reqs[bookingReqIndex].username, subject, htmlContent);

        hall.hall_booking_reqs.splice(bookingReqIndex, 1);
        await hall.save();
        return res.json({
            message: 'Booking request deleted.',
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