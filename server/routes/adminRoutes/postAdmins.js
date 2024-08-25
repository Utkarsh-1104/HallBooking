import dotenv from "dotenv"
import express from "express"
import { db } from "../../db/db.js"
import Admin from "../../schema/AdminSchema.js"
import jwt from "jsonwebtoken"
import md5 from "md5"

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        await db()

        const existingAdmin = await Admin.findOne({
            username: req.body.username
        })
        if (existingAdmin) {
            return res.json({
                msg: 'This username is taken / Admin already exists.',
                status: 400
            })
        }

        const admin = await new Admin({
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            password: md5(req.body.password),
            role: req.body.role,
            designation: req.body.designation
        })
        await admin.save()

        const userid = admin._id

        const token = jwt.sign({
            userid,
        }, process.env.JWT_SECRET)

        res.json({
            fname: admin.fname,
            lname: admin.lname,
            designation: admin.designation,
            token: token,
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