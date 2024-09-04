import mongoose from 'mongoose'

const hallSchema = new mongoose.Schema({
    hall_name: {
        type: String,
        required: [true, 'Hall name is required']
    },
    hall_capacity: Number,
    hall_availability: [{
        date: String,
        time_from: String,
        time_to: String,
        event_name: String,
        booked_by: String,
        booking_id: String,
        admin_booking_id: String
    }]
})

const Hall = mongoose.models.Hall || mongoose.model('Hall', hallSchema)

export default Hall