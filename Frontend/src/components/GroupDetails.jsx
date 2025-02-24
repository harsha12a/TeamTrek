import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Users, Edit, PlusCircle, UserPlus } from "lucide-react";
import { editGroupAsync, fetchGroups } from "../redux/groupSlice";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify'
import axios from "axios";

function GroupDetails() {
  const { id } = useParams(); // Get group ID from URL
  const {
    formState: { errors },
    setError,
    clearErrors,
    trigger,
  } = useForm();
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups); // Get groups from Redux
  const user = useSelector((state) => state.user.user);
  const [group, setGroup] = useState(null);
  const [task, setTask] = useState(""); // Task input state
  const [editMode, setEditMode] = useState(false);
  const [editedGroup, setEditedGroup] = useState({ name: "", description: "" });
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (groups) {
      const selectedGroup = groups.find((g) => g._id === id);
      setGroup(selectedGroup);
      setEditedGroup({
        name: selectedGroup?.name,
        description: selectedGroup?.description,
      });
    }
  }, [groups, id]);
  useEffect(() => {
    dispatch(fetchGroups(user?._id));
  }, [dispatch, user]);

  if (!group) {
    return <p className="text-center text-gray-500">Group not found...</p>;
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
        clearErrors("people"); // Remove error when a tag is added
        trigger("people"); // Revalidate
      }
    }
  };

  // Remove a tagged user
  const handleDeleteTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    if (updatedTags.length === 0) {
      setError("people", {
        type: "manual",
        message: "At least one user must be tagged",
      });
    }
  };
  // Handle task submission
  const handleAddTask = () => {
    if (!task.trim()) return;
    console.log(`Task added: ${task}`);
    setTask(""); // Clear input
  };

  // Handle group edit submission
  const handleSaveEdit = () => {
  if (!editedGroup.name.trim()) return;

  dispatch(editGroupAsync({ id, updatedGroup: editedGroup }))
    .unwrap()
    .then(() => {
      return dispatch(fetchGroups(user._id));
    })
    .catch((error) => {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        draggable: true,
      });
    })
    .finally(() => setEditMode(false))
};


  // Handle adding people
  const handleAddPeople = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.put(
        `http://localhost:4000/group/addPeople/${id}`,
        {
          people: tags,
        }
      );

      setGroup(response.data); // Update state with new people
      setTags([]); // Clear tags

      dispatch(fetchGroups(user._id));
      toast.success("Members added successfully",{
        position: "top-center",
        autoClose: 2000,
        draggable: true
      })
    } catch (error) {
      console.error("Error adding people:", error);
      toast.error(error.response.data.message,{
        position: "top-center",
        autoClose: 2000,
        draggable: true
      })
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Users
              className="w-10 h-10 text-indigo-600 mr-3"
              strokeWidth={1.5}
            />
            {!editMode ? (
              <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
            ) : (
              <input
                type="text"
                value={editedGroup.name}
                onChange={(e) =>
                  setEditedGroup({ ...editedGroup, name: e.target.value })
                }
                className="text-3xl font-bold border-b-2 border-indigo-500 focus:outline-none"
              />
            )}
          </div>

          <button onClick={() => setEditMode(!editMode)}>
            <Edit className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {!editMode ? (
          <p className="text-gray-600">
            {group.description || "No description available."}
          </p>
        ) : (
          <textarea
            value={editedGroup.description}
            onChange={(e) =>
              setEditedGroup({ ...editedGroup, description: e.target.value })
            }
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
            {group?.people?.map((member, index) => (
              <li key={index} className="text-gray-700">
                {member}
              </li>
            ))}
          </ul>
        </div>

        {/* Add People Section */}
        <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add People</h2>
          <form onSubmit={handleAddPeople} className="flex">
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-600"
                    onClick={() => handleDeleteTag(tag)}
                  >
                    {tag} <span className="ml-2">&times;</span>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type user name and press Enter"
              />
              {errors.people && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.people.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="ml-2 bg-blue-600 text-white px-3 py-2 rounded-md flex items-center"
            >
              <UserPlus className="w-5 h-5 mr-1" />
              Add
            </button>
          </form>
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
            <button
              onClick={handleAddTask}
              className="ml-2 bg-green-500 text-white px-3 py-2 rounded-md flex items-center"
            >
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
