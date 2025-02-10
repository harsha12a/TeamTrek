const express = require('express')
const router = express.Router()

const { getGroups, createGroup, addPeople, addTask } = require('../controllers/group.controller')

router.get('/', getGroups)
router.post('/create/:id', createGroup)
router.put('/addPeople/:id', addPeople)
router.put('/addTask/:id', addTask)

module.exports = router