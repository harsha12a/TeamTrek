const Task = require('../models/task.model')
const User = require('../models/user.model')
const Group = require('../models/group.model')

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUserTasks = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findById(userId).populate('tasks')
        if(!user) return res.status(404).json({ message: 'User not found' })
        res.status(200).json(user.tasks)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createTask = async(req, res) => {
    const userId = req.body.createdBy
    try {
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({ message: 'User not found' })
        const task = new Task(req.body)
        const assignedUser = await User.findById(req.body.assignedTo)
        if(req.body.assignedTo){
            if(!assignedUser) return res.status(404).json({ message: 'Assigned user not found' })
            task.assignedTo = req.body.assignedTo
        }
        if(req.body.groupId){
            const group = await Group.findById(groupId)
            if (!group) return res.status(404).json({ message: 'Group not found' })
            task.groupId = req.body.groupId
            group.tasks.push(newTask._id)
            await group.save()
        }
        const newTask = await task.save()
        user.tasks.push(newTask._id)
        if(assignedUser){
            assignedUser.tasks.push(newTask._id)
            await assignedUser.save()
        }
        await user.save()
        res.status(201).json(newTask)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const addMention = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.body.assignedTo;

    try {
        const task = await Task.findById(taskId).populate('groupId').populate('createdBy');
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const taskBy = await User.findById(task.createdBy);
        if (!taskBy) return res.status(404).json({ message: 'Task creator not found' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Assigned user not found' });

        const groupId = task.groupId ? task.groupId._id.toString() : null;
        if (!groupId) return res.status(404).json({ message: 'Group not found' });

        // Ensure `groups` is an array before calling `.includes()`
        const isUserInGroup = Array.isArray(user.groups) && user.groups.includes(groupId);
        const isTaskByInGroup = Array.isArray(taskBy.groups) && taskBy.groups.includes(groupId);

        if (!isUserInGroup || !isTaskByInGroup) {
            return res.status(400).json({ message: 'Both users must be in the same group' });
        }

        await Task.findByIdAndUpdate(taskId, { $addToSet: { assignedTo: userId } });

        res.status(200).json({ message: "User mentioned successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getTasks,
    getUserTasks,
    createTask,
    addMention
}