import axios from "axios";
import { useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { triggerConnectionRefresh } from "../redux/slices/userConnections";
import { setUserRequest } from "../redux/slices/userRequests";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const userRequests = useSelector((store) => store.userRequests);
  const dispatch = useDispatch();
  const fetchUserConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });

      dispatch(setUserRequest(res.data?.userConnections));
    } catch (err) {
      console.log(err);
    }
  };

  const sendConnection = async (connectionType, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + connectionType + id,
        {},
        { withCredentials: true }
      );
      console.log("connections sent", res);
      dispatch(triggerConnectionRefresh());
      fetchUserConnections();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (userRequests.length === 0) {
      fetchUserConnections();
    }
  }, []);

  return (
    <div>
      <div className=" py-4">
        <p className="md:text-2xl text-md text-center  font-semibold mb-6 text-white/80">
          Connection Requests
        </p>

        {userRequests.length !== 0 ? (
          <div className="space-y-4 flex flex-col w-full  items-center ">
            {userRequests.map((connection, index) => {
              const { firstName, lastName, photoUrl, about } =
                connection?.fromUserId;
              return (
                <div key={index} className="w-3/4">
                  <div className="card flex px-2 py-2  items-center card-side bg-base-300 shadow-md">
                    <div className="md:w-20 md:h-20 w-12 h-12   rounded-full overflow-hidden">
                      <img
                        src={photoUrl}
                        alt={`${firstName}_Photo`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4 md:card-body flex-1">
                      <div className="flex justify-between w-full">
                        <h2 className="card-title text-xs capitalize">
                          {firstName} {lastName}
                        </h2>
                        <div className="flex gap-1 md:gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              sendConnection("accepted/", connection?._id)
                            }
                          >
                            <IoMdCheckmark className="text-green-500 text-xs sm:text-sm md:text-xl" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              sendConnection("rejected/", connection?._id)
                            }
                          >
                            <IoClose className="text-red-500 text-xs sm:text-sm md:text-xl" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs">{about}</p>
                    </div>
                    {/* <div className="flex-1 gap-2">
                      <button className="btn btn-primary text-xs"></button>
                      <button className="btn btn-secondary text-xs">
                        Ignore
                      </button>
                    </div> */}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-md text-red-500 text-center"> No Requests Yet!!</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
