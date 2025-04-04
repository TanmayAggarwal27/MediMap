const mongoose = require("mongoose")

const mongo = mongoose.connect("mongodb://localhost:27017/MediMap").then(()=>{
    console.log("mongo connected")
}
    
)

module.exports = mongo
