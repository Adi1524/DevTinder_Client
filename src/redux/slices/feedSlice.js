import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      return null;
    },
    removeSwipedCard: (state, action) => {
      const userId = action.payload;
      return state?.filter((user = user._id) !== userId) || [];
    },
  },
});

export const { addFeed, removeFeed, removeSwipedCard } = feedSlice.actions;
export default feedSlice.reducer;
