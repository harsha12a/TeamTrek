import { motion } from "framer-motion";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { fetchTasks } from "../redux/taskSlice";
export default function Tasks() {
  // const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);
  const user = useSelector((state) => state.user.user);
  // const removeTask = (index) => {
  //   setTasks(tasks.filter((_, i) => i !== index));
  // };
  const dispatch = useDispatch();
  const editTask = (index) => {
    navigate("/add", { state: { task: tasks[index], index } });
  };

  useEffect(() => {
    dispatch(fetchTasks(user._id));
  }, [user._id, dispatch]);
  return (
    <div className="w-full mt-5">
      {tasks.length ? (
        <h1 className="text-3xl fonting text-center">Tasks</h1>
      ) : (
        <h1 className="text-2xl text-center">
          No Tasks Available
          <br />
          <Link to={"../add"} className="text-red-900">
            Add now
          </Link>
        </h1>
      )}
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
              <button
                onClick={() => editTask(index)}
                className="text-blue-500 hover:text-blue-700 transition"
              >
                <FaEdit />
              </button>
              <button
                // onClick={() => removeTask(index)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FaTrash />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
