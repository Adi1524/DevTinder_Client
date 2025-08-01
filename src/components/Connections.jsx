import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserConnections } from "../redux/slices/userConnections";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const userConnections = useSelector((store) => store.userConnections);
  const dispatch = useDispatch();
  const fetchUserConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });

      console.log("res of connections", res?.data?.data);

      dispatch(setUserConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  console.log("userConnections", userConnections);

  useEffect(() => {
    if (userConnections.length === 0) {
      fetchUserConnections();
    }
  }, []);
  return (
    <div>
      <div className=" py-4">
        <p className="text-2xl text-center font-semibold mb-6 text-white/80">
          Connections
        </p>

        {userConnections.length !== 0 ? (
          <div className="space-y-4 flex flex-col w-full  items-center ">
            {userConnections.map((connection, index) => {
              const { firstName, lastName, photoUrl, about } = connection;
              return (
                <div key={index} className="w-1/2">
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

export default Connections;
