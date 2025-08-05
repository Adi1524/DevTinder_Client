import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserConnections } from "../redux/slices/userConnections";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const userConnections = useSelector(
    (store) => store.userConnections.connections
  );
  const connectionsNeedRefresh = useSelector(
    (state) => state.userConnections.connectionsNeedRefresh
  );

  console.log("connectionsNeed", connectionsNeedRefresh);
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

  useEffect(() => {
    if (userConnections.length === 0) {
      fetchUserConnections();
    }
  }, []);

  useEffect(() => {
    fetchUserConnections();
  }, [connectionsNeedRefresh]);
  return (
    <div>
      <div className=" py-4">
        <p className="text-2xl text-center font-semibold mb-6 text-white/80">
          Connections
        </p>

        {userConnections && userConnections.length !== 0 ? (
          <div className="space-y-4 flex flex-col w-full  items-center ">
            {userConnections.map((connection, index) => {
              const { firstName, lastName, photoUrl, about } = connection;
              return (
                <div key={index} className="md:w-1/2 w-full md:px-0 px-4">
                  <div className="card flex px-2 py-2  items-center card-side bg-base-300 shadow-md">
                    <div className="md:w-20 md:h-20 w-12 h-12  rounded-full overflow-hidden">
                      <img
                        src={photoUrl}
                        alt={`${firstName}_Photo`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="card-body">
                      <h2 className="card-title text-sm ms:text-md capitalize">
                        {firstName} {lastName}
                      </h2>
                      <p className="text-xs md:text:sm">{about}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-md text-red-500 text-center">
            {" "}
            No Connections Yet!!
          </p>
        )}
      </div>
    </div>
  );
};

export default Connections;
