const express = require("express")
const app = express()
const authRouter = require("./routes/authRoute.js")
const mongo = require("./lib/mongo.js")
const path = require("path")
const mediRouter = require("./routes/medicineRoute.js")
const cookieParser = require("cookie-parser");
const {checkForAuthenticationCookie} = require("./utils/auth.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"));

app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.use("/",authRouter)
app.use("/",mediRouter)




app.listen(3000,(req,res)=>{
    console.log("hello world")
})