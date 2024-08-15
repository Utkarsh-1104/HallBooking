import express from "express"
import { db } from "../../db/db.js"
import Admin from "../../schema/AdminSchema.js"
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        await db()
        const admin = await new Admin({
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            password: req.body.password,
            designation: req.body.designation
        })
        await admin.save()
        return res.json({
            msg: 'admin saved',
            status: 200
        })
    } catch (error) {
        return res.json({
            msg: error.message,
            status: 400
        })
    }
})

export default router;