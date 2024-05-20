import express from 'express'
import cors from 'cors'
import getHalls from './routes/getHalls.js'
import postHalls from './routes/postHalls.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/gethalls', getHalls)
app.use('/posthall', postHalls)

app.get('/', (req, res) => {
    res.json({ message: 'Server running' })
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})