import { createSlice } from "@reduxjs/toolkit";

const userConnectionSlice = createSlice({
  name: "userConnections",
  initialState: [],
  reducers: {
    setUserConnections: (state, action) => action.payload,
    removeUserConnections: (state, action) => null,
  },
});

export const { setUserConnections, removeUserConnections } =
  userConnectionSlice.actions;
export default userConnectionSlice.reducer;
