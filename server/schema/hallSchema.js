import mongoose from 'mongoose'

const hallSchema = new mongoose.Schema({
    hall_name: {
        type: String,
        required: true
    },
    hall_capacity: Number,
    hall_availability: [Object]
})

const Hall = mongoose.models.Hall || mongoose.model('Hall', hallSchema)

export default Hall