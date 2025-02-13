import { useForm } from "react-hook-form";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-20">
      <div className="text-center text-4xl font-bold">Register</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-1"
          >
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-sm text-red-500 font-semibold mt-1">
              *Name is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-sm text-red-500 font-semibold mt-1">
              *Email is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="contact"
            className="block text-gray-700 font-medium mb-1"
          >
            Contact Number
          </label>
          <input
            type="number"
            {...register("contact", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.contact && (
            <span className="text-sm text-red-500 font-semibold mt-1">
              *Number is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <span className="text-sm text-red-500 font-semibold mt-1">
              *Password is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-medium mb-1"
          >
            Confirm Password
          </label>
          <input
            type="confirmPassword"
            {...register("confirmPassword", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
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
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
