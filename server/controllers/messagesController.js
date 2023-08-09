const messageModel = require("../model/messageModel")

module.exports.addMsg = async (req, res) => {
    try {
        const { from, to, message } = req.body
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from
        })
        if (data) return res.status(200).json('Add Message Well')
        return res.status(400).json('Fail To Add Message')
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getMsg = async (req, res) => {
    try {
        const { from, to } = req.body
        const messages = await messageModel.find({
            users: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1 })

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })
        return res.status(200).json(projectedMessages)
    } catch (error) {
        res.status(500).json(error)
    }
}