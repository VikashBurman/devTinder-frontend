import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { removerUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      // console.log(res.data.message);
      dispatch(removerUser());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar bg-gray-900 shadow-lg border-b border-gray-700 px-8 py-4 text-white">
      <div className="flex-1">
        <Link
          to="/feed"
          className="text-3xl font-extrabold text-pink-400 hover:text-pink-300 transition-all"
        >
          QuickMatch
        </Link>
      </div>

      <div className="flex-none">
        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-6">
              <p className="text-lg font-semibold text-gray-300">
                Hi, {user.firstName}{" "}
              </p>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-pink-500 hover:border-pink-400 transition-all shadow-lg"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    alt="User Profile"
                    src={user.photoUrl}
                    className="w-full h-full object-cover shadow-md"
                  />
                </div>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 rounded-xl z-50 mt-4 w-56 p-3 shadow-xl border border-gray-600"
            >
              <li>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 hover:bg-gray-700 rounded-lg px-4 py-2"
                >
                  🏠 <span className="text-gray-200">Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="flex items-center gap-3 hover:bg-gray-700 rounded-lg px-4 py-2"
                >
                  🔗 <span className="text-gray-200">Connections</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="flex items-center gap-3 hover:bg-gray-700 rounded-lg px-4 py-2"
                >
                  📩 <span className="text-gray-200">Requests</span>
                </Link>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="text-red-400 hover:bg-red-600 hover:text-white rounded-lg px-4 py-2 flex items-center gap-3 transition-all"
                >
                  🚪 Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
