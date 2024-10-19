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
                    <h1>Your existing booking has been removed.</h1>
                    <h3>Event: ${booking.event_name}</h3>
                    <h3>Date: ${booking.date_from} to ${booking.date_to}</h3>
                    <h3>Time: ${booking.time_from} to ${booking.time_to}</h3>
                    <h3>Participants: ${booking.number_of_attendees}</h3>
                    <h3>Hall Name: ${hall.hall_name}</h3>
                    <h3>Building: ${hall.building}</h3>
                    <h3>College: ${hall.college}</h3>
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