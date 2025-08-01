import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    photoUrl: "",
    about: "",
  });
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    setUserDetails({ ...userDetails, [name]: value });
    console.log(userDetails);
  };

  const user = useSelector((store) => store.user);
  console.log("user", user);

  const handleProfileSave = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: userDetails?.firstName,
          lastName: userDetails?.lastName,
          age: userDetails?.age,
          gender: userDetails?.gender,
          photoUrl: userDetails?.photoUrl,
          about: userDetails?.about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      setUserDetails({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || 0,
        gender: user.gender || "",
        photoUrl: user.photoUrl || "",
        about: user.about || "",
      });
    }
  }, [user]);

  return (
    <div className="flex mt-4 ">
      <div className="flex w-full items-center justify-center ">
        <div className="card card-dash bg-base-300 w-96 ">
          <div className="card-body ">
            <h2 className="card-title  mx-auto">Profile</h2>
            <div className="space-y-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  value={userDetails.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  value={userDetails.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  value={userDetails.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  value={userDetails.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url</legend>
                <input
                  value={userDetails.photoUrl}
                  onChange={(e) => handleChange("photoUrl", e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Bio</legend>
                <input
                  value={userDetails.about}
                  onChange={(e) => handleChange("about", e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
            </div>

            <div className=" flex  justify-center">
              <button
                type="button"
                onClick={handleProfileSave}
                className="btn btn-primary px-6"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-non">
        <UserCard user={userDetails} />
      </div>
    </div>
  );
};

export default EditProfile;
