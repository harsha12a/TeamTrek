const User = require('../models/user.model')

const getUser = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const regUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) return res.status(400).json({ message: "Email already in use" })
        const user = await User.create(req.body)
        console.log(user)
        res.status(200).send({ message: 'User created successfully'})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user) return res.status(400).json({ message: "User not found" })
        if(user.password !== req.body.password) return res.status(400).json({ message: "Invalid password" })
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}

const modifyUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password')
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}

const deleteUser = async (req, res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json({message: 'User deleted successfully'})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports = {
    getUser,
    regUser,
    loginUser,
    modifyUser,
    deleteUser
}