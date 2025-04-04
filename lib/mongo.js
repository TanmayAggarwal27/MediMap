require("dotenv").config()
const mongoose = require("mongoose")


const mongo = mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongo connected")
}
    
)

module.exports = mongo
