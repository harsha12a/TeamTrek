const express = require('express')
const router = express.Router()
const { getUser, regUser, loginUser, deleteUser } = require('../controllers/user.controller')

router.get('/', getUser)
router.post('/register', regUser)
router.post('/login', loginUser)
router.delete('/:id', deleteUser)

module.exports = router