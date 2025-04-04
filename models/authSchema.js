const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
        unique:true,


    },
    pincode:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    }
})


const user = mongoose.model("user",UserSchema )
module.exports = user