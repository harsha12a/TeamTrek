import { Link, Outlet } from "react-router-dom";

export default function DashBoard() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-400 to-purple-600 p-4">
      <nav className="flex gap-4 mb-5 flex-wrap justify-center">
        <Link 
          to="add" 
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Add Task
        </Link>
        <Link 
          to="tasks" 
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          View Tasks
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
