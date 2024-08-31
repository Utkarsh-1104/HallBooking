import express from "express"
import { db } from "../../db/db.js"
import Admin from "../../schema/AdminSchema.js"
import bcrypt from "bcrypt"
const router = express.Router()

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await db()
        const adminToBeUpdated = await Admin.findOne({_id: id})
        if (!adminToBeUpdated) {
            return res.json({
                msg: 'Admin not found.',
                status: 404
            })
        }
        
        bcrypt.hash(req.body.password, 10, async function(err, hash) {
            await Admin.updateOne(
                {
                    _id: id
                },
                {
                    "$set": {
                        fname: req.body.fname || adminToBeUpdated.fname,
                        lname: req.body.lname || adminToBeUpdated.lname,
                        username: req.body.username || adminToBeUpdated.username,
                        password: hash || adminToBeUpdated.password,
                        role: req.body.role || adminToBeUpdated.role,
                        designation: req.body.designation || adminToBeUpdated.designation
                    }
                }
            )
        });
        
        return res.json({
            msg: 'admin details updated',
            status: 200
        })
    } catch (error) {
        res.json({
            msg: "admin not updated",
            status: 400
        })
    }
})

export default router;