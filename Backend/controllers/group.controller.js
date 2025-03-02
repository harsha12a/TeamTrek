const Group = require("../models/group.model");
const User = require("../models/user.model");
const Task = require("../models/task.model");
const sendMail = require("../config/nodeMailer");
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("people", "name email");
    res.status(200).json(groups);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching groups", error: error.message });
  }
};

const createGroup = async (req, res) => {
  const userId = req.params.id;
  const { name, description, people = [] } = req.body;

  try {
    // Validate requesting user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!name)
      return res.status(400).json({ message: "Group name is required" });

    // Convert usernames to ObjectIds
    const users = await User.find({ username: { $in: people } });
    const userIds = users.map((u) => u._id);

    // Validate that all usernames were found
    if (users.length !== people.length) {
      const foundUsernames = users.map((u) => u.username);
      const missingUsers = people.filter(
        (username) => !foundUsernames.includes(username)
      );
      return res
        .status(400)
        .json({ message: `User(s) not found: ${missingUsers.join(", ")}` });
    }

    // Ensure creator's ID is included in the group
    if (!userIds.includes(user._id)) {
      userIds.push(user._id);
    }

    // Create group with user IDs
    const group = new Group({ name, description, people: userIds });
    const newGroup = await group.save();

    // Update users to include this group
    await User.updateMany(
      { _id: { $in: userIds } },
      { $addToSet: { groups: newGroup._id } }
    );
    if (users.length > 0) {
      users.forEach(async (groupUser) => {
        const emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <img src="https://example.com/logo.png" alt="Your App Logo" style="display: block; margin: 0 auto; max-width: 200px;">
            <h1>WorkGrid</h1>
            <h2 style="color: #007bff;">Group Invitation</h2>
            <h3 style="color: #333;">You've been added to a group!</h3>
            <p>Hi <strong>${groupUser.name}</strong>,</p>
            <p>You have been added to the group <strong>${name}</strong> by ${user.username}.</p>
            <p style="margin: 10px 0;">Description: ${description || "No description provided."}</p>
            <a href="https://your-app-link.com/groups/${newGroup._id}" style="display: inline-block; padding: 10px 15px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">View Group</a>
            <p style="margin-top: 20px;">Regards,<br/>Your App Team</p>
          </div>
        `;
        
        // Send email to each user
        await sendMail(
          groupUser.email,
          `You've been added to the group: ${name}`,
          emailContent
        );
      });
    }
    res.status(201).json(newGroup);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating group", error: error.message });
  }
};
const editGroup = async (req, res) => {
  const groupId = req.params.id;
  const { name, description } = req.body;

  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedGroup)
      return res.status(404).json({ message: "Group not found" });

    res
      .status(200)
      .json({ message: "Group updated successfully", group: updatedGroup });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating group", error: error.message });
  }
};

const addPeople = async (req, res) => {
  const groupId = req.params.id;
  const { people } = req.body; // Expecting an array of usernames

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Find users by their usernames
    const foundUsers = await User.find({ username: { $in: people } }, "_id");

    if (foundUsers.length !== people.length) {
      return res.status(400).json({ message: "One or more users not found" });
    }

    // Extract user IDs from found users
    const userIds = foundUsers.map((user) => user._id);

    // Update users to add the group to their groups field
    await User.updateMany(
      { _id: { $in: userIds } },
      { $addToSet: { groups: groupId } }
    );

    // Update the group to add people
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { people: { $each: userIds } } },
      { new: true }
    ).populate("people", "username email");

    res
      .status(200)
      .json({ message: "People added successfully", group: updatedGroup });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const addTask = async (req, res) => {
  const groupId = req.params.id;
  let { assignedTo } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });
    const assignedUsers = await User.find(
      { username: { $in: assignedTo } },
      "_id"
    );
    if (assignedUsers.length !== assignedTo.length) {
      return res
        .status(400)
        .json({ message: "One or more assigned users not found" });
    }
    let assignedUsersId = assignedUsers.map((user) => user._id);
    const newTask = new Task({
      groupId,
      ...req.body,
      assignedTo: assignedUsersId,
    });
    const savedTask = await newTask.save();
    await Group.findByIdAndUpdate(groupId, {
      $addToSet: { tasks: savedTask._id },
    });

    res
      .status(201)
      .json({ message: "Task added successfully", task: savedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding task", error: error.message });
  }
};

const getTasks = async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch user and groups
    const user = await User.findById(userId, "groups").populate("groups");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch tasks for each group the user is in
    const groupTasks = await Promise.all(
      user.groups.map(async (groupId) => {
        const group = await Group.findById(groupId).populate("tasks");
        if (!group) return null; // Skip if group not found

        // Populate people in the group
        group.people = await Promise.all(
          group.people.map((user) => User.findById(user, "username email"))
        );

        // Populate assignedTo and createdBy for each task
        await Promise.all(
          group.tasks.map(async (task) => {
            task.assignedTo = await Promise.all(
              task.assignedTo.map((user) => User.findById(user, "username email"))
            );
            task.createdBy = await User.findById(task.createdBy, "username email");
          })
        );

        return group;
      })
    );

    res.status(200).json(groupTasks.filter((group) => group !== null)); // Remove null groups
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
};

module.exports = {
  getGroups,
  createGroup,
  editGroup,
  addPeople,
  addTask,
  getTasks,
};
