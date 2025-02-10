const Group = require('../models/group.model')
const User = require('../models/user.model')
const Task = require('../models/task.model')

const getGroups = async (req, res) => {
    try {
        const groups = await Group.find()
        res.status(200).json(groups)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createGroup = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({ message: 'User not found' })
        const group = new Group(req.body)
        user.groups.push(group._id)
        await user.save()
        group.people.push(userId)
        const newGroup = await group.save()
        res.status(201).json(newGroup)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const addPeople = async (req, res) => {
    const groupId = req.params.id
    const people = req.body.people
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "Group not found" })

        const foundUsers = await User.find({ _id: { $in: people } })
        if (foundUsers.length !== people.length) {
            return res.status(404).json({ message: "One or more users not found" })
        }

        await User.updateMany({ _id: { $in: people } }, { $addToSet: { groups: groupId } })
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { people: { $each: people } } },
            { new: true }
        );

        res.status(200).json(updatedGroup)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addTask = async (req, res) => {
    const groupId = req.params.id
    const task = req.body

    try {
        const group = await Group.findById(groupId);
        if(!group) return res.status(404).json({ message: "Group not found" })
        const newTask = new Task({ ...task, groupId })
        const savedTask = await newTask.save()
        await Group.findByIdAndUpdate(groupId, { 
            $addToSet: { tasks: savedTask._id } 
        });

        res.status(201).json({ message: "Task added successfully", task: savedTask })
    } catch (error) {
        console.error("Error in addTask:", error);
        res.status(500).json({ message: error.message })
    }
};


module.exports = {
    getGroups,
    createGroup,
    addPeople,
    addTask
}