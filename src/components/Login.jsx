import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmail] = useState("vikash@gmail.com");
  const [password, setPassword] = useState("Vikash@123");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/login",
        {
          emailId: emailId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/feed")

    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900">
      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
          Sign In
        </h2>
  
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="your@email.com"
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password" // ✅ Fixed issue here
              className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-gray-400">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-500 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-500 hover:text-indigo-400">
              Forgot password?
            </a>
          </div>
  
          {/* Sign In Button */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-all">
            Sign In
          </button>
        </form>
  
        {/* Sign Up Link */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-500 hover:text-indigo-400 font-medium">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
  
  
};

export default Login;
