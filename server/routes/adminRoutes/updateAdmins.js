import express from "express"
import { db } from "../../db/db.js"
import Admin from "../../schema/AdminSchema.js"
const router = express.Router()

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await db()
        const adminToBeUpdated = await Admin.findOne({_id: id})
        let new_username = req.body.username || adminToBeUpdated.username
        let new_password = req.body.password || adminToBeUpdated.password
        let new_designation = req.body.designation || adminToBeUpdated.designation
        await Admin.updateOne(
            {
                _id: id
            },
            {
                "$set": {
                    username: new_username,
                    password: new_password,
                    designation: new_designation
                }
            }
        )
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