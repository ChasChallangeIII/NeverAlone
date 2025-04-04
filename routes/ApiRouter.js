import express from "express";

const router = express.Router();

const records = [];

router.post("/record", (req, res) => {
  const recordData = req.body;
  records.push(records);

  res.status(200).json({ recordData });
});

export default router;
