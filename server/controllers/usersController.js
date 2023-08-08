const User = require('../model/userModel')
const bcrypt = require('bcrypt')

module.exports.register = async (req, res) => {
    try {
        const username = req.body.username.trim()
        const password = req.body.password.trim()
        const email = req.body.email.trim()
        const usernameCheck = await User.findOne({ username })
        if (usernameCheck) {
            return res.status(409).json({ msg: "username already exited", status: false })
        }
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            return res.status(409).json({ msg: "email already exited", status: false })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            username,
            password: hashPassword
        })
        delete user.password
        return res.status(200).json({ msg: "register ok", status: true, user })
    } catch (error) {
        return res.status(500).json(error)
    }

}

module.exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const username = req.body.username.trim()
        const password = req.body.password.trim()
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ msg: "username or password wrong", status: false })
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(400).json({ msg: "username or password wrong", status: false })
        }
        delete user.password
        return res.status(200).json({ msg: "login ok", status: true, user })
    } catch (error) {
        return res.json(error)
    }
}

module.exports.setAvatar = async (req, res) => {
    try {
        const userId = req.params.id
        const avatarImage = req.body.image
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        })
        return res.status(200).json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })
    } catch (error) {
        return res.json(error)
    }
}

module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])

        return res.status(200).json(users)

    } catch (error) {
        return res.json(error)
    }
}