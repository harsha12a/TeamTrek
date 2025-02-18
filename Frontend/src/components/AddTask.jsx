import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

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
  })

  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log("Task Added:", data)
    navigate("../tasks")
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">To-Do List</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        
        {/* Task Name */}
        <input
          type="text"
          {...register("name", { required: "Task name is required" })}
          placeholder="Task Name (Required)"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        {/* Description */}
        <input
          type="text"
          {...register("desc")}
          placeholder="Description"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Due Date */}
        <input
          type="date"
          {...register("dueDate", { required: "Due date is required" })}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}

        {/* Priority (Default: medium) */}
        <select
          {...register("priority")}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        {/* Status (Default: pending) */}
        <select
          {...register("status")}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">pending</option>
          <option value="inProgress">inProgress</option>
          <option value="completed">completed</option>
        </select>

        {/* File Upload */}
        <input
          type="file"
          {...register("file")}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  )
}
