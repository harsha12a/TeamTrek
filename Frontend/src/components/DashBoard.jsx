import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function DashBoard() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input.trim()]);
      setInput("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center p-2 bg-gray-200 rounded-lg">
              <span>{task}</span>
              <button className="text-red-500 hover:text-red-700" onClick={() => removeTask(index)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
