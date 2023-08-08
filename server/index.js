const express = require("express")
const app = express()
const cors = require("cors")
// const http = require("http")


const userRoutes = require('./routes/userRoutes')

const mongoose = require("mongoose")


require("dotenv").config()
app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connection Successfully");
}).catch((err) => {
    console.log(err.message);
})


const server = app.listen(process.env.PORT, () => {
    console.log(`server running on PORT ${process.env.PORT}`);
})

