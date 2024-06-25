const express = require("express");
const {
  getStatistics,
  addStatistics,
} = require("../controllers/statisticsController");

const router = express.Router();

router.get("/", getStatistics);
router.post("/", addStatistics);

module.exports = router;
