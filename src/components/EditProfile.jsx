import { useState } from "react";
import FeedCard from "./FeedCard";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import PropTypes from "prop-types";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [skills, setSkills] = useState(user.skills);
  const [age, setAge] = useState(user?.age);
  const [about, setAbout] = useState(user?.about);
  const [gender, setGender] = useState(user?.gender);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, skills, age, gender, about },
        {
          withCredentials: true,
        }
      );
      if(res.status === 200){
        alert("Profile updated successfully");
      }
      // console.log(res);

      dispatch(addUser(res.data.data));
    } catch (error) {
      console.error(
        "An error occurred while saving the profile. Please try again." + error
      );
    }
  };

  return (
    user && (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
          {/* Container for Form and Card */}
          <div className="flex flex-col md:flex-row gap-10">
            {/* Edit Profile Form */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 text-white">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Edit Profile
              </h2>

              <form className="space-y-4" onSubmit={saveProfile}>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full bg-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    className="input input-bordered w-full bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input input-bordered w-full bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Skills
                  </label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="input input-bordered w-full bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered w-full bg-gray-700"
                    min="18"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Gender
                  </label>
                  <select
                    className="select select-bordered w-full bg-gray-700"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    About
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full bg-gray-700"
                    rows="2"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </div>

                <button className="btn btn-primary w-full">Save Profile</button>
              </form>
            </div>
            <FeedCard
              user={{
                firstName,
                lastName,
                photoUrl,
                skills,
                age,
                gender,
                about,
              }}
            />
          </div>
        </div>
      </>
    )
  );
};

//to solve error missing in props validation
EditProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photoUrl: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    age: PropTypes.number,
    about: PropTypes.string,
    gender: PropTypes.string,
  }),
};

export default EditProfile;
