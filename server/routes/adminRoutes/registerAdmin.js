import express from 'express';
import { db } from '../../db/db.js';
import Admin from '../../schema/AdminSchema.js';
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        await db();
        const admin = new Admin(req.body);
        await admin.save();
        res.send(admin)
    } catch (error) {
        return res.json({
            msg: error.message,
            status: 400
        });
    }
    }
);