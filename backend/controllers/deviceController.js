const Device = require("../models/deviceModel");

const axios = require("axios");

// Simulated IoT API URL (replace with real URL)
const IOT_API_URL = "http://example.com/api/real-time-data"; // Replace with actual API URL

// Fetch real-time data from the IoT API and control devices
exports.controlDevices = async (req, res) => {
  try {
    // Fetch real-time sensor data (e.g., temperature, humidity, gas levels)
    const { temperature, humidity, gasLevel } = await getRealTimeData();

    console.log(
      `Real-time data received: Temperature: ${temperature}, Humidity: ${humidity}, Gas Level: ${gasLevel}`
    );

    // Define threshold values
    const tempThreshold = 30;
    const humidityThreshold = 70;
    const gasThreshold = 100;

    // Fetch all devices related to a product
    const devices = await Device.find({});

    // Prepare actions and alerts
    const actions = [];
    const alerts = [];

    // Control devices based on sensor data
    if (temperature > tempThreshold) {
      const coolingDevices = devices.filter(
        (device) => device.type === "cooling"
      );
      coolingDevices.forEach((device) => {
        device.status = "on"; // Turn on cooling device
        actions.push(
          `Cooling device ${device.deviceID} turned on for high temperature.`
        );
      });
    }

    if (humidity > humidityThreshold) {
      const dehumidifierDevices = devices.filter(
        (device) => device.type === "dehumidifier"
      );
      dehumidifierDevices.forEach((device) => {
        device.status = "on"; // Turn on dehumidifier
        actions.push(
          `Dehumidifier device ${device.deviceID} turned on for high humidity.`
        );
      });
    }

    if (gasLevel > gasThreshold) {
      const alertDevices = devices.filter((device) => device.type === "LED");
      alertDevices.forEach((device) => {
        device.status = "on"; // Trigger LED alert
        actions.push(
          `LED alert device ${device.deviceID} triggered for high gas levels.`
        );
      });
    }

    // Save actions to the log (you can also integrate a logging service or database)
    console.log("Actions taken:", actions);

    // Respond with actions
    res.json({ message: "Device control and monitoring completed", actions });

    // Log alert messages to a console (for simplicity)
    if (actions.length > 0) {
      alerts.push(actions.join("\n"));
      console.log("Alerts sent:", alerts);
    }
  } catch (error) {
    console.error("Error controlling devices:", error);
    res.status(500).json({ message: "Error controlling devices" });
  }
};

// Simulated function to get real-time data from the IoT API
async function getRealTimeData() {
  try {
    // Simulating an API request to get real-time sensor data
    const response = await axios.get(IOT_API_URL);
    return response.data; // Assuming the API response contains { temperature, humidity, gasLevel }
  } catch (error) {
    console.error("Error fetching real-time data:", error);
    throw new Error("Failed to fetch real-time data");
  }
}

// Create a new device
exports.createDevice = async (req, res) => {
  try {
    const { deviceID, productID, type } = req.body;

    // Create new device
    const newDevice = new Device({ deviceID, productID, type });
    await newDevice.save();

    res
      .status(201)
      .json({ message: "Device created successfully", device: newDevice });
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(500).json({ message: "Error creating device" });
  }
};

// Get all devices
exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.find().populate("productID");
    res.json({ devices });
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ message: "Error fetching devices" });
  }
};

// Update a device
exports.updateDevice = async (req, res) => {
  try {
    const { deviceID } = req.params;
    const { status } = req.body;

    const device = await Device.findOne({ deviceID });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    device.status = status;
    await device.save();

    res.json({ message: "Device updated successfully", device });
  } catch (error) {
    console.error("Error updating device:", error);
    res.status(500).json({ message: "Error updating device" });
  }
};

// Delete a device
exports.deleteDevice = async (req, res) => {
  try {
    const { deviceID } = req.params;

    const device = await Device.findOneAndDelete({ deviceID });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.json({ message: "Device deleted successfully" });
  } catch (error) {
    console.error("Error deleting device:", error);
    res.status(500).json({ message: "Error deleting device" });
  }
};
