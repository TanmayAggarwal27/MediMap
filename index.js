const express = require("express")
const app = express()
const authRouter = require("./routes/authRoute.js")
const mongo = require("./lib/mongo.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRouter)



app.listen(3000,(req,res)=>{
    console.log("hello world")
})