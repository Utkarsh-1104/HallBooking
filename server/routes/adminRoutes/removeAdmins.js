import express from "express"
import { db } from "../../db/db.js"
import Admin from "../../schema/AdminSchema.js"
const router = express.Router()

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await db()
        await Admin.deleteOne({_id: id})
        return res.json({
            msg: 'Admin deleted successfully.',
            status: 200
        })
    } catch (error) {
        res.json({
            msg: "Some error occurerd, admin not deleted.",
            status: 400
        })
    }
})

export default router;