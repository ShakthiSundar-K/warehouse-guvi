// routes/monitoringRoutes.js
const express = require("express");
const {
  generateData,
  getData,
} = require("../controllers/monitoringController");
const router = express.Router();

router.post("/generate", generateData);
router.post("/get", getData);

module.exports = router;
