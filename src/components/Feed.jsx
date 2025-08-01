import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/slices/feedSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/feed?page=1&limit=10",

        { withCredentials: true }
      );
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  console.log("how many cards in feed:", feed);

  useEffect(() => {
    if (!feed) {
      fetchFeed();
    }
  }, []);

  return (
    <div className="grid place-items-center">
      {feed &&
        feed.map((details, index) => (
          <div key={index} style={{ gridRow: 1, gridColumn: 1 }}>
            <UserCard user={details} />
          </div>
        ))}
    </div>
  );
};

export default Feed;
