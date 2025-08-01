import axios from "axios";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import AdditionalDetails from "./signup/AdditionalDetails";
import PersonalDetails from "./signup/PersonalDetails";

const Signup = () => {
  const [page, setPage] = useState("personal");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    age: 0,
    gender: "",
    password: "",
    photoUrl: "",
    about: "",
    skills: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("userdetails", userDetails);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          emailId: userDetails.emailId,
          age: Number(userDetails.age),
          gender: userDetails.gender,
          password: userDetails.password,
          photoUrl: userDetails.photoUrl,
          about: userDetails.about,
          skills: userDetails.skills,
        },
        { withCredentials: true }
      );
      navigate("/login");

      console.log("response", res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => {
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleNext = () => {
    setPage("additionalDetails");
  };
  return (
    <div className="flex w-full items-center mt-8 justify-center h-[80vh]">
      <div className="card card-dash  bg-base-300 w-96">
        <div className="card-body">
          <div className="flex items-center gap-4">
            {page !== "personal" && (
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setPage("personal")}
              >
                <IoIosArrowBack size={20} />
              </button>
            )}
            <h2 className="card-title  mx-auto">Signup</h2>
          </div>
          {page === "personal" && (
            <PersonalDetails
              handleChange={handleChange}
              userDetails={userDetails}
            />
          )}
          {page === "additionalDetails" && (
            <AdditionalDetails
              handleChange={handleChange}
              userDetails={userDetails}
            />
          )}

          <div className=" flex mt-4  justify-center">
            <button
              type="button"
              onClick={page === "personal" ? handleNext : handleLogin}
              className="btn btn-primary px-6"
            >
              {page === "personal" ? "Next" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
