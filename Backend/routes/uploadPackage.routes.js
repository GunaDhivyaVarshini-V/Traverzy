const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Package = require("../models/package"); // Replace with your actual model

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/packages'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  }
});

const upload = multer({ storage });

// POST route to handle package upload
router.post("/upload", upload.single("packageImage"), async (req, res) => {
  const { packageName, destination, description, price, guests } = req.body;
  const packageImage = req.file ? req.file.path : null; // Save file path

  try {
    const newPackage = new Package({
      packageName,
      destination,
      description,
      price,
      guests,
      packageImage
    });

    await newPackage.save();

    res.status(200).json({ message: "Package uploaded successfully", package: newPackage });
  } catch (err) {
    console.error("Error uploading package:", err);
    res.status(500).json({ error: "Error uploading package. Please try again later." });
  }
});

module.exports = router;
