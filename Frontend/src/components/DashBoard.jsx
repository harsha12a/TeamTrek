import { Link, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
export default function DashBoard() {
  const user = useSelector((state) => state.user.user)
  return (
    <div>
      {user ? (
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
      ) : (
        <div className="text-white text-center pt-40 text-lg font-semibold h-screen bg-blue-500">
          Not logged in
          <br />
          <Link to={"../login"} className="text-red-900">
            Login here
          </Link>
        </div>
      )}
    </div>
  )
}
