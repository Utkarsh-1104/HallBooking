import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ 
        msg: 'Authorized',
        id: req.userId,
        fname: req.fname,
        lname: req.lname,
        username: req.username,
        designation: req.designation,
        status: 200
    })
})

export default router;