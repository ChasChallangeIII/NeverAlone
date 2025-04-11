const express = require("express");
const router = express.Router();
const { BadRequestError, NotFoundError } = require("../utils/errors");

router.post("/records", (req, res, next) => {
  try {
    const data = null;
    if (!data) {
      throw new NotFoundError("Inget innehåll hittades");
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
