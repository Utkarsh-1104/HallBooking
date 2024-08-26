import express from 'express'
import { db } from '../../db/db.js'
import Admin from '../../schema/AdminSchema.js'
import bcrypt from 'bcrypt'

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
                    res.json({
                        fname: admin.fname,
                        lname: admin.lname,
                        id: admin._id,
                        designation: admin.designation,
                        role: admin.role,
                        msg: 'Login successful',
                        status: 200
                    })
                } else {
                    res.json({
                        msg: 'Invalid username/password',
                        status: 400
                    })
                }
            });
        } else {
            res.json({
                msg: 'Invalid username/password',
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
