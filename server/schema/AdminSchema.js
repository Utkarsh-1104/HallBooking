import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'First name is required'],
        unique: true
    },
    lname: {
        type: String,
        required: [true, 'Last name is required']
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        minlength: [6, 'Username must be at least 6 characters long']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        unique: true
    },
    designation: String
})
const Admin = mongoose.models.Admin ||  mongoose.model('Admin', adminSchema)

export default Admin