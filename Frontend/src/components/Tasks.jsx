import { motion } from "framer-motion";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    navigate("/add", { state: { task: tasks[index], index } });
  };

  return (
    <div className="w-full mt-5">
      {tasks.length ? <h1 className="text-2xl text-center">Tasks</h1> : <h1 className="text-2xl text-center">No Tasks Available</h1>}
      <ul className="space-y-2 lg:mx-20">
        {tasks.map((task, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col p-3 bg-gray-100 rounded-lg shadow"
          >
            <span className="text-gray-800 font-bold">{task.name}</span>
            <span className="text-gray-600">Due: {task.dueDate}</span>
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => editTask(index)} className="text-blue-500 hover:text-blue-700 transition">
                <FaEdit />
              </button>
              <button onClick={() => removeTask(index)} className="text-red-500 hover:text-red-700 transition">
                <FaTrash />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
