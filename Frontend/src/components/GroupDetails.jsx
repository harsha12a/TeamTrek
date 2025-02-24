import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Users, Edit, PlusCircle } from "lucide-react";

function GroupDetails() {
  const { id } = useParams(); // Get group ID from URL
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups); // Get groups from Redux
  const [group, setGroup] = useState(null);
  const [task, setTask] = useState(""); // Task input state
  const [editMode, setEditMode] = useState(false);
  const [editedGroup, setEditedGroup] = useState({ name: "", description: "" });

  useEffect(() => {
    if (groups) {
      const selectedGroup = groups.find((g) => g._id === id);
      setGroup(selectedGroup);
      setEditedGroup({ name: selectedGroup?.name, description: selectedGroup?.description });
    }
  }, [groups, id]);

  if (!group) {
    return <p className="text-center text-gray-500">Group not found...</p>;
  }

  // Handle task submission
  const handleAddTask = () => {
    if (!task.trim()) return;
    // Dispatch action or API call to add task (placeholder function)
    console.log(`Task added: ${task}`);
    setTask(""); // Clear input
  };

  // Handle group edit submission
  const handleSaveEdit = () => {
    if (!editedGroup.name.trim()) return;
    // Dispatch action or API call to update group (placeholder function)
    console.log(`Group updated: ${JSON.stringify(editedGroup)}`);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Users className="w-10 h-10 text-indigo-600 mr-3" strokeWidth={1.5} />
            {!editMode ? (
              <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
            ) : (
              <input
                type="text"
                value={editedGroup.name}
                onChange={(e) => setEditedGroup({ ...editedGroup, name: e.target.value })}
                className="text-3xl font-bold border-b-2 border-indigo-500 focus:outline-none"
              />
            )}
          </div>

          <button onClick={() => setEditMode(!editMode)}>
            <Edit className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {!editMode ? (
          <p className="text-gray-600">{group.description || "No description available."}</p>
        ) : (
          <textarea
            value={editedGroup.description}
            onChange={(e) => setEditedGroup({ ...editedGroup, description: e.target.value })}
            className="w-full p-2 border rounded-md"
            rows="2"
          />
        )}

        {editMode && (
          <button
            onClick={handleSaveEdit}
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        )}

        {/* Members Section */}
        <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Members</h2>
          <ul className="space-y-2">
            {group.people.map((member, index) => (
              <li key={index} className="text-gray-700">{member}</li>
            ))}
          </ul>
        </div>

        {/* Task Section */}
        <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Tasks</h2>
          <div className="flex">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="flex-1 border p-2 rounded-md"
              placeholder="Add a new task..."
            />
            <button onClick={handleAddTask} className="ml-2 bg-green-500 text-white px-3 py-2 rounded-md flex items-center">
              <PlusCircle className="w-5 h-5 mr-1" />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetails;
