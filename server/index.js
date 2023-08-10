const express = require("express")
const app = express()
const cors = require("cors")
const { createServer } = require("http")
const { Server } = require("socket.io")
// const socket = require("socket.io");
const httpServer = createServer(app)
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messagesRoutes')
const mongoose = require("mongoose")


require("dotenv").config()
app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)
app.use("/api/message", messageRoutes)


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connection Successfully");
}).catch((err) => {
    console.log(err.message);
})


// const server = app.listen(process.env.PORT, () => {
//     console.log("server running at PORT 5000");
// })
httpServer.listen(process.env.PORT, () => {
    console.log(`server running at PORT ${process.env.PORT}`);
})

// 好好好，接下来是socket.io的表演时间
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

// httpServer.listen(5000, () => {
//     console.log('server running at PORT 5000');
// })

// 存储当前所有在线用户
global.onlineUsers = new Map()
io.on("connection", (socket) => {
    console.log(`socket连接至${socket.conn.transport.name}`);
    global.chatSocket = socket
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message)
        }
    })
    socket.on("disconnect", (reason) => {
        console.log(`scoket断开连接，原因是${reason}`);
    })
})