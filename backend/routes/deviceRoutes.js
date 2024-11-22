const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");

// Device CRUD operations
router.post("/create", deviceController.createDevice);
router.get("/", deviceController.getDevices);
router.put("/:deviceID", deviceController.updateDevice);
router.delete("/:deviceID", deviceController.deleteDevice);

// Real-time data fetching and device control
router.get("/control", deviceController.controlDevices);

module.exports = router;
