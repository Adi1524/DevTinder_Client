import { createSlice } from "@reduxjs/toolkit";

const userRequestSlice = createSlice({
  name: "userRequests",
  initialState: [],
  reducers: {
    setUserRequest: (state, action) => action.payload,
    removeUserRequest: (state, action) => null,
  },
});

export const { setUserRequest, removeUserRequest } = userRequestSlice.actions;
export default userRequestSlice.reducer;
