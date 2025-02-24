const express = require('express')
const router = express.Router()

const { getGroups, createGroup, addPeople, addTask, editGroup } = require('../controllers/group.controller')

router.get('/', getGroups)
router.post('/create/:id', createGroup)
router.put('/addPeople/:id', addPeople)
router.put('/addTask/:id', addTask)
router.put('/edit/:id', editGroup)

module.exports = router