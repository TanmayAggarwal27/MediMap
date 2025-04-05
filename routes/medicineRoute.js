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
      const pincode = req.query.pincode;
      let filter = {};
  
      if (query) {
        filter.$or = [
          { name: { $regex: query, $options: "i" } },
          { salt: { $regex: query, $options: "i" } }
        ];
      }
  
      // If pincode is provided, add nested filter for createdBy.pincode
      let meds = await Medicine.find(filter)
        .populate({
          path: "createdBy",
          select: "username email address phoneNumber pincode",
          match: pincode ? { pincode } : undefined,
        });
  
      // Remove medicines where createdBy is null due to pincode mismatch
      if (pincode) {
        meds = meds.filter(med => med.createdBy !== null);
      }
  
      res.render("medicines", { medicines: meds });
    } catch (err) {
      console.error("Error fetching medicines:", err);
      res.status(500).send("Server error");
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

router.get('/my-medicines', requireAuth, async (req, res) => {
  try {
    const medicines = await Medicine.find({ createdBy: req.user._id });
    res.render('userMeds', { medicines });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/delete-medicine/:id', requireAuth, async (req, res) => {
  try {
    await Medicine.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    res.redirect('/my-medicines');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



module.exports = router;
