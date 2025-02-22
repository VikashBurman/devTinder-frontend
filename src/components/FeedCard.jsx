
import PropTypes from "prop-types";
const FeedCard = ({ user }) => {
  // console.log(user);
  
  const { firstName, lastName, photoUrl, skills, age, gender, about } = user;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white shadow-lg rounded-2xl p-6 w-96">
        
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 shadow-lg"
          />
        </div>

        {/* Name & About */}
        <h2 className="mt-4 text-2xl font-bold text-center text-gray-100">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-gray-400 text-center mt-1">{about}</p>

        {/* Age & Gender */}
        <div className="mt-4 flex justify-center gap-6 text-gray-300">
          <p>
            <span className="font-semibold text-white">Age:</span> {age}
          </p>
          <p>
            <span className="font-semibold text-white">Gender:</span> {gender}
          </p>
        </div>

        {/* Skills Section */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {skills}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between px-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md">
            ❌ Reject
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md">
            ✅ Accept
          </button>
        </div>
      </div>
    </div>
  );
};

FeedCard.propTypes = {
  user: PropTypes.shape({
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
