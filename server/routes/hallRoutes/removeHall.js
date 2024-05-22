import express from "express"
import { db } from "../../db/db.js"
import Hall from "../../schema/hallSchema.js"
const router = express.Router()

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await db()
        await Hall.deleteOne({_id: id})
        return res.json({
            msg: 'hall deleted',
            status: 200
        })
    } catch (error) {
        res.json({
            msg: "hall not deleted",
            status: 400
        })
    }
})

export default router