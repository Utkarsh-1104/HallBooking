import express from 'express';
import { db } from '../../db/db.js';
import Admin from '../../schema/AdminSchema.js';
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        await db();
        const admins = await Admin.find({});
        res.send(admins)
    } catch (error) {
        return res.json({
            msg: error.message,
            status: 400
        });
    }
    }
);

export default router;