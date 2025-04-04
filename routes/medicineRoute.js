const express = require("express");
const router = express.Router();
const Medicine = require("../models/medicineSchema.js");
const user = require("../models/authSchema.js")
const {validateToken,checkForAuthenticationCookie, requireAuth }= require("../utils/auth.js")


router.get("/add", requireAuth,(req, res) => {
    res.render("addMedicines"); 
  });
  router.post("/add", requireAuth, async (req, res) => {
    try {
      const medicines = req.body.medicines; // array of selected medicines
      const chemistId = req.user._id;
  
      if (!medicines || medicines.length === 0) {
        return res.status(400).json({ message: "No medicines selected." });
      }
  
      const insertedMeds = [];
      const skippedMeds = [];
  
      for (const med of medicines) {
        const { name, salt, price } = med;
  
        if (!name || !salt || !price) continue;
  
        // Check if medicine with the same name already exists (case-insensitive)
        const existing = await Medicine.findOne({ name: new RegExp(`^${name}$`, "i") });
  
        if (existing) {
          skippedMeds.push(name);
          continue;
        }
  
        const newMed = new Medicine({
          name,
          salt,
          price,
          createdBy: chemistId,
        });
  
        await newMed.save();
        insertedMeds.push(newMed);
      }
  
        res.redirect("/all")
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: err.message });
    }
  });
  
  
router.get("/all", async (req, res) => {
    try {
      const query = req.query.q;
      let meds;
  
      if (query) {
        meds = await Medicine.find({
          $or: [
            { name: { $regex: query, $options: "i" } },
            { salt: { $regex: query, $options: "i" } }
          ]
        }).populate("createdBy", "username email address phoneNumber");
      } else {
        meds = await Medicine.find().populate("createdBy", "username email address phoneNumber");
      }
  
      res.render("medicines", { medicines: meds });
    } catch (err) {
      
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
