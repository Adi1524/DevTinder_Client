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
    <div className="grid h-full">
      {feed && feed.length !== 0 ? (
        feed.map((details, index) => (
          <div
            key={details._id}
            style={{
              gridRow: 1,
              gridColumn: 1,
              zIndex: feed.length - index,
            }}
          >
            <UserCard user={details} isTopCard={index === 0} />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
          <div className="text-6xl mb-4">💔</div>
          <div className="text-2xl font-bold text-gray-600 mb-2">
            No more profiles!
          </div>
          <div className="text-gray-500">Check back later for new matches</div>
          <button
            onClick={fetchFeed}
            className="mt-4 bg-pink-500 hover:bg-pink-600 cursor-pointer text-white px-6 py-2 rounded-full transition-colors"
          >
            Refresh Feed
          </button>
        </div>
      )}
    </div>
  );
};

export default Feed;
