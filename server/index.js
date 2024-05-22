import express from 'express'
import cors from 'cors'
import getHalls from './routes/hallRoutes/getHalls.js'
import postHalls from './routes/hallRoutes/postHalls.js'
import bookHall from './routes/hallRoutes/bookHall.js'
import updateHall from './routes/hallRoutes/updateHalls.js'
import removeHall from './routes/hallRoutes/removeHall.js'

import getAdmins from './routes/adminRoutes/getAdmins.js'
import postAdmins from './routes/adminRoutes/postAdmins.js'
import removeAdmins from './routes/adminRoutes/removeAdmins.js'
import updateAdmins from './routes/adminRoutes/updateAdmins.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/gethalls', getHalls)
app.use('/posthall', postHalls)
app.use('/bookhall', bookHall)
app.use('/updatehall', updateHall)
app.use('/removehall', removeHall)

app.use('/getadmins', getAdmins)
app.use('/postadmins', postAdmins)
app.use('/removeadmins', removeAdmins)
app.use('/updateadmins', updateAdmins)

app.get('/', (req, res) => {
    res.json({ message: 'Server running' })
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})