require("dotenv").config();
const express = require("express");
const app = express();
const cors = require ("cors");
const connectpool = require("./configs/database");
const profileRoute = require("./routes/profileRoute");

app.use(cors());
app.use (express.json());

//Api
app.use("/api", profileRoute);



app.get("/", (req,res) => {
    res.status(200).json({status:"Succes", Message:"App is Running Live"})
});


const PORT = process.env.PORT;
app.listen (PORT, ()=> {
    console.log (`Server is Live on ${PORT}`)
})