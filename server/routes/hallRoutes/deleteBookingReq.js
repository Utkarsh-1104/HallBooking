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
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h1 style="color: #e14733; text-align: center;">Sorry! Your booking request has been declined.</h1>

                <table style="width: 100%; max-width: 600px; margin: 20px auto; border-collapse: collapse; background-color: #f9f9f9; border: 1px solid #ddd; padding-left: 50px;">
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem; width: 30%;"><strong style="color: #374151;">Event:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem; width: 70%;">${hall.hall_booking_reqs[bookingReqIndex].event_name}</td>
                    </tr>
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Date:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${hall.hall_booking_reqs[bookingReqIndex].date_from} to ${hall.hall_booking_reqs[bookingReqIndex].date_to}</td>
                    </tr>
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Time:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${hall.hall_booking_reqs[bookingReqIndex].time_from} to ${hall.hall_booking_reqs[bookingReqIndex].time_to}</td>
                    </tr>
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Participants:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${hall.hall_booking_reqs[bookingReqIndex].number_of_attendees}</td>
                    </tr>
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Hall Name:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${hall.hall_booking_reqs[bookingReqIndex].hall_name}</td>
                    </tr>
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Building:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${hall.hall_booking_reqs[bookingReqIndex].hall_building}</td>
                    </tr>
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">College:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${hall.hall_booking_reqs[bookingReqIndex].hall_college}</td>
                    </tr>
                </table>
                </div>

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