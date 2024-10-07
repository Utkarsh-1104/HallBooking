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
        const newPassword = req.body.newPassword;
        if (newPassword.length === 0) {
            await Admin.updateOne(
                {
                    _id: id
                },
                {
                    "$set": {
                        username: req.body.newUsername || adminToBeUpdated.username,
                    }
                }
            )
        } else {
            bcrypt.hash(req.body.newPassword, 10, async function(err, hash) {
                await Admin.updateOne(
                    {
                        _id: id
                    },
                    {
                        "$set": {
                            username: req.body.newUsername || adminToBeUpdated.username,
                            password: hash || adminToBeUpdated.password,
                        }
                    }
                )
            });
        }
        return res.json({
            msg: 'Profile updated successfully.',
            status: 200
        })
    } catch (error) {
        res.json({
            msg: "An error occurred.",
            status: 400
        })
    }
})

export default router;