import mongoose from 'mongoose'

const hallSchema = new mongoose.Schema({
    hall_name: {
        type: String,
        required: [true, 'Hall name is required']
    },
    hall_capacity: Number,
    college: String,
    building: String,
    hall_availability: [{
        date_from: String,
        date_to: String,
        time_from: String,
        time_to: String,
        event_name: String,
        booked_by: String,
        username: String,
        booking_id: String,
        admin_booking_id: String,
        number_of_attendees: Number
    }],
    hall_booking_reqs: [{
        date_from: String,
        date_to: String,
        time_from: String,
        time_to: String,
        event_name: String,
        booked_by: String,
        username: String,
        booking_id: String,
        admin_booking_id: String,
        number_of_attendees: Number,
        hall_name: String,
        hall_building: String,
        hall_college: String,
        booking_req_at: {
            type: Date,
            default: Date.now
        }
    }]
},
{
    timestamps: true
})

const Hall = mongoose.models.Hall || mongoose.model('Hall', hallSchema)

export default Hall