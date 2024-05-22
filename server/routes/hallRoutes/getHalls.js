import express from 'express';
import { db } from '../../db/db.js';
import Hall from '../../schema/hallSchema.js';
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await db();
    const halls = await Hall.find({});
    res.send(halls)
  } catch (error) {
    return res.json({
      msg: error.message,
      status: 400
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db()
    const indi_hall = await Hall.findById(id)
    res.send(indi_hall)
  } catch (error) {
    res.json({
      msg: error.message,
      status: 400
    })
  }
})

export default router;