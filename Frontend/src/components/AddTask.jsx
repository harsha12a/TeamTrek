import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [input, setInput] = useState({ name: "", desc: "", dueDate: "", priority: "", status: "", file: null });
  const navigate = useNavigate();

  const addTask = () => {
    if (input.name.trim() !== "" && input.dueDate.trim() !== "") {
      console.log("Task Added:", input);
      setInput({ name: "", desc: "", dueDate: "", priority: "", status: "", file: null });
      navigate("../tasks"); // Redirect to tasks page
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">To-Do List</h1>
      <div className="flex flex-col gap-2 mb-4">
      <input
            type="text"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            placeholder="Task Name (Required)"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={input.desc}
            onChange={(e) => setInput({ ...input, desc: e.target.value })}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={input.dueDate}
            onChange={(e) => setInput({ ...input, dueDate: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={input.priority}
            onChange={(e) => setInput({ ...input, priority: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            value={input.status}
            onChange={(e) => setInput({ ...input, status: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="file"
            onChange={(e) => setInput({ ...input, file: e.target.files[0] })}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
            Add Task
        </button>
      </div>
    </div>
  );
}
