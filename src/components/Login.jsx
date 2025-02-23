import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      return navigate("/feed");
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
    <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-700">
      <h2 className="text-3xl font-bold text-gray-200 mb-6 text-center">Sign In</h2>

      <form className="space-y-6" onSubmit={handleLogin}>
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="your@email.com"
            value={emailId}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Forgot Password & Submit Button */}
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <Link to="/forgot-password" className="text-indigo-500 hover:text-indigo-400 transition-all">
            Forgot password?
          </Link>
        </div>

        {/* Sign In Button */}
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-all">
          Sign In
        </button>
      </form>

      {/* Sign-Up Redirect */}
      <div className="mt-6 text-center text-sm text-gray-400">
        Dont have an account?{" "}
        <Link to="/signup" className="text-indigo-500 hover:text-indigo-400 font-medium">
          Sign up
        </Link>
      </div>
    </div>
  </div>
  );
};

export default Login;
