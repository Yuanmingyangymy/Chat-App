const { register, login, setAvatar, getUsers } = require('../controllers/usersController')

const express = require('express')
const router = express.Router()


router.post("/register", register)
router.post("/login", login)
router.post("/setAvatar/:id", setAvatar)
router.get("/allUsers/:id", getUsers)


module.exports = router