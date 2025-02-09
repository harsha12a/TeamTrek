const User = require('../models/user.model')

const getUser = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const regUser = async (req, res) => {
    try {
        const user = await User.create(req.body)    
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password })
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'User deleted successfully'})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports = {
    getUser,
    regUser,
    loginUser,
    deleteUser
}