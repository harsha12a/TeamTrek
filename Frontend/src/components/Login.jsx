import { useForm } from "react-hook-form";
import pic from "../assets/login-bg.jpg";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.user.user);
  let dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(login(data));
    console.log(user);
  };
  return (
    <div
      className="pt-28 z-10"
      style={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md mx-auto bg-transparent backdrop-blur-xl p-6 rounded-lg shadow-md">
        <div className="text-center text-white text-4xl font-bold">Login</div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div>
            <label
              htmlFor="email"
              className="block text-white font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="bg-gray-100 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-sm text-red-500 font-semibold mt-1">
                *Email is required
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-white font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="bg-gray-100 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <span className="text-sm text-red-500 font-semibold mt-1">
                *Password is required
              </span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold mt-5 py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
