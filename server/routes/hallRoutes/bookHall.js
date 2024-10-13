import express from "express";
import { db } from "../../db/db.js";
import Hall from "../../schema/hallSchema.js";
const router = express.Router();

function randomIdGenerator() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 12;
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

router.patch('/:hall_id', async (req, res) => {
    const id = req.params.hall_id
    const { date_from, date_to, time_from, time_to, event_name, booked_by, admin_booking_id, number_of_attendees, role, hall_name } = req.body
    const booking_id = randomIdGenerator()
    try {
        await db()
        if(role === "admin" && (id === "6703bfa0bdf6ef86a0ab7f51" || id === "66d1fe65a58995a923a5bf56")) {
            await Hall.updateOne (
                { 
                    _id: id 
                }, 
                { 
                    "$push": {
                        hall_booking_reqs: {
                            date_from: date_from,
                            date_to: date_to,
                            time_from: time_from,
                            time_to: time_to,
                            event_name: event_name,
                            booked_by: booked_by,
                            booking_id: booking_id,
                            admin_booking_id: admin_booking_id,
                            number_of_attendees: number_of_attendees,
                            hall_name: hall_name
                        } 
                    }
                }
            )
            return res.json({
                msg: 'Hall booking request sent.',
                status: 200
            })  
        } else {
            await Hall.updateOne (
                { 
                    _id: id 
                }, 
                { 
                    "$push": {
                        hall_availability: {
                            date_from: date_from,
                            date_to: date_to,
                            time_from: time_from,
                            time_to: time_to,
                            event_name: event_name,
                            booked_by: booked_by,
                            booking_id: booking_id,
                            admin_booking_id: admin_booking_id,
                            number_of_attendees: number_of_attendees
                        } 
                    }
                }
            )
            return res.json({
                msg: 'Hall booked successfully.',
                status: 200
            })  
        }
    } catch (error) {
        return res.json({
            msg: error.message,
            status: 400
        })
    }
    //res.json({ msg: 'patch halls' })
})

export default router;