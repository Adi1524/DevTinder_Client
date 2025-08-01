import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../redux/slices/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("tanjiro@gmail.com");
  const [password, setPassword] = useState("Tanjiro@12345");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full items-center justify-center h-[80vh]">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title  mx-auto">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="input"
                placeholder="Type here"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>

          <p className="text-xs my-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-500 cursor-pointer"
            >
              Sign up
            </Link>
          </p>

          <div className=" flex  justify-center">
            <button
              type="button"
              onClick={handleLogin}
              className="btn btn-primary px-6"
            >
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
