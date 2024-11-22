const axios = require("axios");
const Device = require("../models/deviceModel");
const Product = require("../models/productModel");
const logger = require("../utils/logger");

// Generate data from sensors (temperature, humidity, gas levels)
exports.generateData = async (req, res) => {
  try {
    const { productID } = req.body;

    // Assuming we fetch sensor data from a remote server or directly from devices
    const sensorData = await axios.post(
      "https://eureka.innotrat.in/generate_data",
      { productID }
    );

    // Extract sensor data from the response
    const { temperature, humidity, gasLevel } = sensorData.data;

    // Pass the sensor data to control devices
    await controlDevices(productID, temperature, humidity, gasLevel);

    res
      .status(200)
      .json({ message: "Data generation and monitoring completed" });
  } catch (error) {
    logger.error(`Error generating data: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

// Control devices based on sensor readings (threshold checking)
async function controlDevices(productID, temperature, humidity, gasLevel) {
  const response = await axios.post(
    "http://localhost:5000/api/devices/control",
    {
      productID,
      temperature,
      humidity,
      gasLevel,
    }
  );

  logger.info(
    `Device control triggered with data: ${temperature}°C, ${humidity}%, Gas Level: ${gasLevel}`
  );
}
