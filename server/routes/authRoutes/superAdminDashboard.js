import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ 
        msg: 'Authorized',
        status: 200
    })
})

export default router;