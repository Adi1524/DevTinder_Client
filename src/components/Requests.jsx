import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  useEffect(() => {
    if (userRequests.length === 0) {
      fetchUserConnections();
    }
  }, []);
  return (
    <div>
      <div className=" py-4">
        <p className="text-2xl text-center font-semibold mb-6 text-white/80">
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
                    <div className="w-20 h-20  rounded-full overflow-hidden">
                      <img
                        src={photoUrl}
                        alt={`${firstName}_Photo`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="card-body">
                      <h2 className="card-title capitalize">
                        {firstName} {lastName}
                      </h2>
                      <p>{about}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn btn-primary">Accept</button>
                      <button className="btn btn-secondary">Ignore</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "No connections!!"
        )}
      </div>
    </div>
  );
};

export default Requests;
