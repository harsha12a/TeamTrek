import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchGroups } from "../redux/groupSlice"; // Redux action
import { Users, UserPlus, UserCircle } from "lucide-react";

function Groups() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { groups, status, error } = useSelector((state) => state.groups);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchGroups(user._id));
    }
  }, [user, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center mb-12">
          <Users className="w-12 h-12 text-indigo-600 mr-4" strokeWidth={1.5} />
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Groups
          </h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-indigo-50 p-8">
          {status === "loading" ? (
            <p className="text-center text-gray-500">Loading groups...</p>
          ) : status === "failed" ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : user?.groups.length ? (
            <div className="flex flex-col gap-6">
              <Link
                to="/creategroup"
                className="ml-auto w-fit bg-blue-600 rounded-lg px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Create Group
              </Link>
              {groups?.map((group) => (
                <div
                  key={group._id}
                  className="group bg-white w-full rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border-2 border-indigo-400 hover:border-indigo-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <UserCircle
                          className="w-8 h-8 text-indigo-600"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-500">Active Group</p>
                      <div className="mt-4 flex items-center space-x-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{group.people.length} members</span>
                      </div>
                    </div>
                    <Link
                      to={"/group/" + group._id}
                      className="bg-gradient-to-br from-indigo-100 border to-purple-100 rounded-full px-4 py-2 text-sm font-semibold text-indigo-600"
                    >
                      Open
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full animate-pulse"></div>
                <Users
                  className="relative w-20 h-20 text-indigo-600"
                  strokeWidth={1.5}
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                No Groups Yet
              </h2>
              <p className="text-gray-600 mb-12 max-w-md">
                Start collaborating with others by creating a new group or
                joining an existing one
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                <Link
                  to="/creategroup"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200"
                >
                  <UserPlus className="w-5 h-5" />
                  Create a Group
                </Link>
                <div className="text-gray-400 sm:px-4">or</div>
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 font-medium rounded-xl border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300 flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Join a Group
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Groups;
