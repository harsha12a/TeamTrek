import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import {useSelector} from 'react-redux'
export default function AddTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      priority: "medium",
      status: "pending",
    },
  });

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const onSubmit = (data) => {
    axios.post('http://localhost:4000/task/create', {...data, createdBy: user._id})
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
    navigate("../tasks");
  };

  return (
    <div className="flex w-auto sm:w-xl justify-center items-center min-h-screen p-4">
      <div className="bg-white shadow-xl rounded-sm p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Create Task</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-gray-700 font-medium">Task Name</label>
            <input
              type="text"
              {...register("title", { required: "Task name is required" })}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter task name"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter task description"
            ></textarea>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-gray-700 font-medium">Due Date</label>
            <input
              type="date"
              {...register("dueDate", { required: "Due date is required" })}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-gray-700 font-medium">Priority</label>
            <select
              {...register("priority")}
              className="w-full mt-1 p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-medium">Status</label>
            <select
              {...register("status")}
              className="w-full mt-1 p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="text-gray-700 font-medium flex items-center gap-2">
              <FiUpload /> Attach File
            </label>
            <input
              type="file"
              {...register("file")}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            <FiCheckCircle /> Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
