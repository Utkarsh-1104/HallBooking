import express from "express"
import { db } from "../../db/db.js"
import Admin from "../../schema/AdminSchema.js"

const router = express.Router()

router.get('/:id', async (req, res) => {
    try {
        await db()

        const admin = await Admin.findOne({
            _id: req.params.id
        })
        return res.json({
            admin: admin,
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