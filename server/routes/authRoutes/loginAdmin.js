import express from 'express'
import { db } from '../../db/db.js'
import Admin from '../../schema/AdminSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/', async (req, res) => {
    await db();

    try {
        const admin = await Admin.findOne({
            username: req.body.username
        })

        if(admin) {
            bcrypt.compare(req.body.password, admin.password, function(err, result) {
                if (result === true) {

                    const token = jwt.sign({
                        userid: admin._id,
                        fname: admin.fname,
                        lname: admin.lname,
                        username: admin.username,
                        designation: admin.designation,
                        role: admin.role
                    }, process.env.JWT_SECRET)

                    res.json({
                        fname: admin.fname,
                        lname: admin.lname,
                        id: admin._id,
                        username: admin.username,
                        designation: admin.designation,
                        role: admin.role,
                        token: token,
                        msg: 'Login successful',
                        status: 200
                    })
                } else {
                    res.json({
                        msg: 'Invalid password',
                        status: 400
                    })
                }
            });
        } else {
            res.json({
                msg: 'Invalid username',
                status: 400
            })
        }
        
    } catch (error) {
        res.json({
            msg: error.message,
            status: 400
        })
    }
})

export default router;
