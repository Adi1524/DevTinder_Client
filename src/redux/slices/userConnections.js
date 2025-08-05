import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connections: [],
  connectionsNeedRefresh: false,
};

const userConnectionSlice = createSlice({
  name: "userConnections",
  initialState,
  reducers: {
    setUserConnections: (state, action) => {
      state.connections = action.payload;
    },
    triggerConnectionRefresh: (state) => {
      state.connectionsNeedRefresh = !state.connectionsNeedRefresh;
    },
    removeUserConnections: (state, action) => null,
  },
});

export const {
  setUserConnections,
  triggerConnectionRefresh,
  removeUserConnections,
} = userConnectionSlice.actions;
export default userConnectionSlice.reducer;
