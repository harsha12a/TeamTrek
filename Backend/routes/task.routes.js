const express = require('express')
const router = express.Router()

const upload = require('../middlewares/upload')
const { getTasks, getUserTasks, createTask, addMention } = require('../controllers/task.controller')

router.get('/', getTasks)
router.get('/user/:id', getUserTasks)
router.post('/create', upload.single('file'), createTask)
router.put('/addMention/:id', addMention)

module.exports = router