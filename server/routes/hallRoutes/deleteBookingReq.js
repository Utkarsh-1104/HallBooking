import express from "express";
import { db } from "../../db/db.js";
import Hall from "../../schema/hallSchema.js";
const router = express.Router();

router.put('/', async (req, res) => {
    const { hall_name, reqId } = req.body;

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