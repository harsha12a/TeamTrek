const express = require('express')
const router = express.Router()

const { getTasks, getUserTasks, createTask, addMention } = require('../controllers/task.controller')

router.get('/', getTasks)
router.get('/user/:id', getUserTasks)
router.post('/create', createTask)
router.put('/addMention/:id', addMention)

module.exports = router