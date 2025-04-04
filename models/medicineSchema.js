const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Brand name, e.g., "Metformin 500mg"
  },
  salt: {
    type: String,
    required: true, // Active ingredient, e.g., "Metformin"
  },
  price: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Chemist who added this
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
