
const express = require('express')
const { addMsg, getMsg } = require('../controllers/messagesController')
const router = express()



router.post('/addMsg', addMsg)
router.post('/getMsg', getMsg)

module.exports = router