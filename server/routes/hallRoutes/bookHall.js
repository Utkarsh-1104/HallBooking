import express from "express";
import { db } from "../../db/db.js";
import Hall from "../../schema/hallSchema.js";
const router = express.Router();

router.patch('/:name', async (req, res) => {
    try {
        await db()
        await Hall.findOneAndUpdate (
            { hall_name: req.params.name }, 
            { hall_availability: req.body.hall_availability }
        )
        return res.json({
            msg: 'hall updated',
            status: 200
        })
    } catch (error) {
        return res.json({
            msg: error.message,
            status: 400
        })
    }
    res.json({ msg: 'patch halls' })
})

export default router;