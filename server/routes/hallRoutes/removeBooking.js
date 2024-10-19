import express from 'express'
import { db } from '../../db/db.js'
import Hall from '../../schema/hallSchema.js'
import e from 'express'
import sendEmail from '../../controller/emailService.js'
const router = express.Router()

router.post('/:id', async (req, res) => {
    const id = req.params.id
    const {booking_id, superadmin_name} = req.body
    try {
        const hall = await Hall.findOne({_id: id})

        if (!hall) {
            return res.json({
                msg: 'Hall not found.',
                status: 404
            })
        }

        const bookingIndex = hall.hall_availability.findIndex(booking => booking.booking_id === booking_id)
        const booking = hall.hall_availability[bookingIndex]
        if (bookingIndex === -1) {
            return res.json({
                msg: 'Booking not found.',
                status: 404
            })
        }

        const result = await Hall.updateOne(
            {_id: id},
            {
                $pull: {
                    hall_availability: {
                        booking_id: booking_id
                    }
                }
            }
        )
        if (result.modifiedCount > 0) {
            async function emailSender() {
                const subject = `Your booking at ${hall.hall_name} has been removed by ${superadmin_name}.`
                const htmlContent = `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h1 style="color: #e14733; text-align: center;">Your existing booking has been removed</h1>

                        <table style="width: 100%; max-width: 600px; margin: 20px auto; border-collapse: collapse; background-color: #f9f9f9; border: 1px solid #ddd; padding-left: 50px;">
                            <tr>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem; width: 30%;"><strong style="color: #374151;">Event:</strong></td>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; width: 70%; font-size:1.15rem">${booking.event_name}</td>
                            </tr>
                            <tr>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Date:</strong></td>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${booking.date_from} to ${booking.date_to}</td>
                            </tr>
                            <tr>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Time:</strong></td>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${booking.time_from} to ${booking.time_to}</td>
                            </tr>
                            <tr>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Participants:</strong></td>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${booking.number_of_attendees}</td>
                            </tr>
                            <tr>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Hall Name:</strong></td>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${hall.hall_name}</td>
                            </tr>
                            <tr>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">Building:</strong></td>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${hall.building}</td>
                            </tr>
                            <tr>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem"><strong style="color: #374151;">College:</strong></td>
                            <td style="padding: 20px; border-bottom: 1px solid #ddd; font-size:1.15rem">${hall.college}</td>
                            </tr>
                        </table>
                        </div>

                `
                await sendEmail(booking.username, subject, htmlContent)
            }
            emailSender()
            res.json({
                msg: 'Booking removed successfully.',
                status: 200
            })
        } else {
            res.json({
                msg: 'No matching booking found.',
                status: 404
            })
        }
    } catch (error) {
        res.json({
            msg: "Some error occured. Couldn't remove booking.",
            status: 400
        })
    }
})

export default router