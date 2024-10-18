import express from 'express';
import { db } from '../../db/db.js';
import Admin from '../../schema/AdminSchema.js';
const router = express.Router();

router.get("/", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        await db();
        const admins = await Admin.find({
            $or: [{
                fname: {
                    "$regex": filter
                }
            }, {
                lname: {
                    "$regex": filter
                }
            }]
        });

        res.json(admins);
    } catch (error) {
        return res.json({
            msg: error.message,
            status: 400
        });
    }
    }
);

router.get("/:id", async (req, res) => {
    try {
        await db();
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.json({
                msg: "Admin not found",
                status: 404
            });
        }
        res.send(admin)
    } catch (error) {
        return res.json({
            msg: error.message,
            status: 400
        });
    }
    }
);

export default router;