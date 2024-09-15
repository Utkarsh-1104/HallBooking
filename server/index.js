import express from 'express'
import cors from 'cors'
import adminAuthMiddleware from './middlewares/adminAuthMiddleware.js'
import superAdminAuthMiddleware from './middlewares/superAdminAuthMiddleware.js'
import authMiddleware from './middlewares/authMiddleware.js'

import getHalls from './routes/hallRoutes/getHalls.js'
import postHalls from './routes/hallRoutes/postHalls.js'
import bookHall from './routes/hallRoutes/bookHall.js'
import updateHall from './routes/hallRoutes/updateHalls.js'
import removeHall from './routes/hallRoutes/removeHall.js'
import removeBooking from './routes/hallRoutes/removeBooking.js'
import availableHalls from './routes/hallRoutes/getAvailableHalls.js'
import getBookedHalls from './routes/hallRoutes/getBookedHalls.js'

import loginAdmin from './routes/authRoutes/loginAdmin.js'
import adminDashboard from './routes/authRoutes/adminDashboard.js'
import superAdminDashboard from './routes/authRoutes/superAdminDashboard.js'

import getAdmins from './routes/adminRoutes/getAdmins.js'
import postAdmins from './routes/adminRoutes/postAdmins.js'
import removeAdmins from './routes/adminRoutes/removeAdmins.js'
import updateAdmins from './routes/adminRoutes/updateAdmins.js'
import getProfile from './routes/adminRoutes/getProfile.js'
import editProfile from './routes/adminRoutes/editProfile.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/gethalls', getHalls)
app.use('/posthall', superAdminAuthMiddleware, postHalls)
app.use('/availablehalls', authMiddleware, availableHalls)
app.use('/bookhall', authMiddleware, bookHall)
app.use('/updatehall', superAdminAuthMiddleware, updateHall)
app.use('/removehall', superAdminAuthMiddleware, removeHall)
app.use('/removebooking', authMiddleware, removeBooking)
app.use('/getbookedhalls',authMiddleware, getBookedHalls)

app.use('/loginadmin', loginAdmin)
app.use('/admindashboard', authMiddleware, adminDashboard)
app.use('/superadmindashboard', superAdminAuthMiddleware, superAdminDashboard)

app.use('/getadmins', superAdminAuthMiddleware, getAdmins)
app.use('/postadmins', superAdminAuthMiddleware, postAdmins)
app.use('/removeadmins', superAdminAuthMiddleware, removeAdmins)
app.use('/updateadmins', superAdminAuthMiddleware, updateAdmins)
app.use('/getprofile', authMiddleware, getProfile)
app.use('/editprofile', authMiddleware, editProfile)

app.get('/', (req, res) => {
    res.json({ message: 'Server running' })
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})