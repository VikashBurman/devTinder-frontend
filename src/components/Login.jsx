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
    <>
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-xl shadow-lg p-8 border-2">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Sign In
          </h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                // placeholder="your@email.com"
                value={emailId}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                // type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                // placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Dont have an account?
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
