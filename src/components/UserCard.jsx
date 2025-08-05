import axios from "axios";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { removeSwipedCard } from "../redux/slices/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const x = useMotionValue(0);
  const feed = useSelector((store) => store.feed);
  console.log("feed in this", feed);

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 0, 150], [-20, 0, 20]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 80) {
      // Swiped right
      animate(x, 500, {
        onComplete: async () => {
          dispatch(removeSwipedCard(user?._id));
          handleSendConnection("interested");
        },
      });
    } else if (info.offset.x < -120) {
      // Swiped left
      animate(x, -500, {
        onComplete: () => {
          dispatch(removeSwipedCard(user?._id));
          handleSendConnection("ignored");
        },
      });
    } else {
      // Snap back to center
      animate(x, 0);
    }
  };

  const handleSendConnection = async (connectionType) => {
    const res = await axios.post(
      BASE_URL + `/request/send/${connectionType}/${user._id}`,
      {},
      { withCredentials: true }
    );
    console.log("res", res);
  };

  return (
    <motion.div
      drag="x"
      style={{
        x,
        rotate,
        opacity,
        borderRadius: "10px",
        backgroundImage: `url(${user?.photoUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "80vh",
      }}
      exit={{ opacity: 0, x: 600, transition: { duration: 0.3 } }}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="hover:cursor-grab active:cursor-grabbing"
    >
      <div className="covercard  w-full h-full flex justify-end items-end">
        <div className="card bg-base-100/80 w-full flex justify-end shadow-sm">
          {/* <div className="w-full rounded-xl overflow-hidden shadow-md">
          <img
            src={user?.photoUrl}
            alt="User Photo"
            className="w-full h-60 object-cover"
          />
        </div> */}
          <div className="card-body">
            <h2 className="card-title">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="capitalize">
              {user?.gender} , {user?.age}
            </p>
            <p>{user?.about}</p>
            {/* <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => onSwipe("interested", user)}
            >
              Interested
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onSwipe("ignored", user)}
            >
              Ignore
            </button>
          </div> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
