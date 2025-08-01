import axios from "axios";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { removeSwipedCard } from "../redux/slices/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user, onSwipe }) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 0, 150], [-20, 0, 20]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 120) {
      // Swiped right
      animate(x, 500, {
        onComplete: async () => {
          removeSwipedCard(user?._id);
          handleSendConnection("interested");
        },
      });
    } else if (info.offset.x < -120) {
      // Swiped left
      animate(x, -500, {
        onComplete: () => {
          removeSwipedCard(user?._id);
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
      style={{ x, rotate, opacity }}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="hover:cursor-grab active:cursor-grabbing"
    >
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="w-full rounded-xl overflow-hidden shadow-md">
          <img
            src={user?.photoUrl}
            alt="User Photo"
            className="w-full h-60 object-cover"
          />
        </div>
        <div className="card-body">
          <h2 className="card-title">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="capitalize">
            {user?.gender} , {user?.age}
          </p>
          <p>{user?.about}</p>
          <div className="card-actions justify-end">
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
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
