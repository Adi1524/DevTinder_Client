import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { addUser } from "../redux/slices/userSlice";
import { BASE_URL } from "../utils/constants";
import Navbar from "./Navbar";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      console.log("err", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Body;
