import PropTypes from "prop-types";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const FeedCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleFeed=async(status,userId)=>{
    try{
      await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
      // console.log(res.data);
      dispatch(removeFeed(userId));
      
    }catch(error){
      console.error(error);
    }
  }
  // console.log(user);
  if(!user){
    return <h1 className="text-white text-2xl">No user found</h1>;
  }

  const { _id, firstName, lastName, photoUrl, skills, age, gender, about } =
    user;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-6">
    <div className="bg-gray-800 text-white shadow-2xl rounded-2xl w-[50rem] h-[26rem] border border-gray-700 flex overflow-hidden">
      
      {/* User Info Section */}
      <div className="flex-1 flex flex-col justify-center px-10 space-y-4">
        <h2 className="text-4xl font-bold text-white">{firstName} {lastName}</h2>
        <p className="text-lg text-gray-300 leading-relaxed">{about}</p>
  
        <div className="flex space-x-8 text-lg text-gray-300">
          <p><span className="font-semibold text-white">Age:</span> {age}</p>
          <p><span className="font-semibold text-white">Gender:</span> {gender}</p>
        </div>
  
        <div className="mt-2 flex flex-wrap gap-3">
          {skills}
        </div>
  
        <div className="mt-6 flex gap-6">
          <button
            className="w-1/2 py-3 rounded-lg text-white font-semibold text-lg bg-red-500 hover:bg-red-600 transition-all transform hover:scale-105 shadow-md"
            onClick={() => handleFeed("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="w-1/2 py-3 rounded-lg text-white font-semibold text-lg bg-green-500 hover:bg-green-600 transition-all transform hover:scale-105 shadow-md"
            onClick={() => handleFeed("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
  
      {/* Image Section */}
      <div className="w-[45%] h-full bg-gray-700">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
      </div>
      
    </div>
  </div>
  



  );
};

FeedCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photoUrl: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    age: PropTypes.number,
    gender: PropTypes.string,
    about: PropTypes.string,
  }).isRequired,
};

export default FeedCard;
