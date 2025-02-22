import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/RequestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requestRecieved = useSelector((state) => state.requests);
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      // console.log(res.data.data);
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.error("Error fetching request", error);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  // console.log(requestRecieved);
  if (!requestRecieved) {
    return;
  }
  if (requestRecieved.lenght === 0) {
    return <div>No request Found</div>;
  }
  // console.log(requestRecieved);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">Connection Requests</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {requestRecieved.map((request) => {
          const user = request.senderUserId; // Extract sender user details

          return (
            <div key={user._id} className="bg-gray-800 shadow-lg rounded-xl p-5 hover:shadow-xl hover:shadow-blue-500/50 transition duration-300">
              <img
                src={user.photoUrl}
                alt={user.firstName}
                className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
              />
              <h2 className="text-xl font-semibold text-center mt-3">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-400 text-center">{user.age} years old | {user.gender}</p>
              <p className="mt-2 text-gray-300 text-center italic">{user.about}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {user.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-4">
                <button className="bg-green-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-green-700 transition">
                  Accept
                </button>
                <button className="bg-red-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-700 transition">
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
