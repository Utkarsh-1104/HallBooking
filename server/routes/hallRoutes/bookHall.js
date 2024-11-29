import express from "express";
import { db } from "../../db/db.js";
import Hall from "../../schema/hallSchema.js";
import sendEmail from "../../controller/emailService.js";
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
    const { date_from, date_to, time_from, time_to, event_name, booked_by, admin_booking_id, number_of_attendees, role, hall_name, hall_building, hall_college,username } = req.body
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
                            username: username,
                            hall_name: hall_name,
                            hall_building: hall_building,
                            hall_college: hall_college
                        } 
                    }
                }
            )

            const subject = `New booking request for ${hall_name} hall.`
            const htmlContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                <h1 style="color: #2563EB; text-align: center;">A booking request has been made for ${hall_name} by ${booked_by}.</h1>

                <table style="width: 100%; max-width: 600px; margin: 20px auto; border-collapse: collapse; background-color: #f9f9f9; border: 1px solid #ddd; padding-left: 50px;">
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem; width: 30%;"><strong style="color: #374151;">Event:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; width: 70%; font-size:1.15rem">${event_name}</td>
                    </tr>
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Date:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${date_from} to ${date_to}</td>
                    </tr>
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Time:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${time_from} to ${time_to}</td>
                    </tr>
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Participants:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${number_of_attendees}</td>
                    </tr>
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Hall Name:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${hall_name}</td>
                    </tr>
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Building:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${hall_building}</td>
                    </tr>
                    <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">College:</strong></td>
                    <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${hall_college}</td>
                    </tr>
                </table>
            </div>

        `
            const superadminEmails = ["lone2104wolf@gmail.com", "lnctmca@lnct.ac.in", "secretary@lnct.ac.in"]

            for (const email of superadminEmails) {
                await sendEmail(email, subject, htmlContent)
            }

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
                            username: username,
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
