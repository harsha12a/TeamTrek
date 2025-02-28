import { useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import { useLocation } from "react-router-dom";

export default function AddGroupTask() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      dueDate: "",
      assignedTo: [],
      files: [],
    },
  });
  const loaction = useLocation();
  const users = loaction.state.people;
  const [selectedAssignees, setSelectedAssignees] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      filename: file.name,
      file: file,
    }));
    setValue("files", uploadedFiles);
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleAssigneeChange = (selectedOptions) => {
    setSelectedAssignees(selectedOptions);
    setValue(
      "assignedTo",
      selectedOptions.map((opt) => opt.value)
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 via-white to-violet-400">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md mt-6 w-full max-w-lg mx-auto space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Create Task</h2>

        {/* Task Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Task Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows="3"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Status & Priority */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              {...register("priority")}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            {...register("dueDate", { required: "Due date is required" })}
            type="date"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
          )}
        </div>

        {/* Assign Users with Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assign To
          </label>
          <Select
            isMulti
            options={users.map((user) => ({
              value: user.username,
              label: user.username,
            }))}
            value={selectedAssignees}
            onChange={handleAssigneeChange}
            className="mt-1"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attach Files
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
