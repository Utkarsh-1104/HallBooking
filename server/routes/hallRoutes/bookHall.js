import express from "express";
import { db } from "../../db/db.js";
import Hall from "../../schema/hallSchema.js";
const router = express.Router();

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await db()
        await Hall.updateOne (
            { 
                _id: id 
            }, 
            { 
                "$push": {
                    hall_availability: req.body 
                }
            }
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
    //res.json({ msg: 'patch halls' })
})

export default router;