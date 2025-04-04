const express = require("express");
const router = express.Router();
const Medicine = require("../models/medicineSchema");
const user = require("../models/authSchema.js")
const {validateToken,checkForAuthenticationCookie, requireAuth }= require("../utils/auth.js")

router.post("/add",requireAuth, async (req, res) => {
  try {
    const { name, salt, price} = req.body;
    const chemistId = req.user._id;

    if (!name || !salt || !price ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMedicine = new Medicine({ 
        name, 
        salt, 
        price, 
        createdBy:chemistId });
    await newMedicine.save();
    res.status(201).json({ message: "Medicine added successfully", medicine: newMedicine });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const meds = await Medicine.find().populate("createdBy", "username email address");
    console.log(meds)
    res.render("medicines", { medicines: meds });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch medicines", error: err.message });
  }
});



router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Please provide a search query (salt or name)." });
    }

    const meds = await Medicine.find({
      $or: [
        { name: { $regex: new RegExp(query, "i") } },
        { salt: { $regex: new RegExp(query, "i") } }
      ]
    });

    res.status(200).json(meds);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
});

module.exports = router;
