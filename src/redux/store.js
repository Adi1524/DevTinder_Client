import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./slices/feedSlice";
import userConnectionReducer from "./slices/userConnections";
import userRequestReducer from "./slices/userRequests";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    userConnections: userConnectionReducer,
    userRequests: userRequestReducer,
  },
});

export default store;
