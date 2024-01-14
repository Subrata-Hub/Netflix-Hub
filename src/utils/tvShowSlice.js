import { createSlice } from "@reduxjs/toolkit";

const tvShowSlice = createSlice({
  name: "tv",
  initialState: {
    tvShowTrailer: null,
  },

  reducers: {
    addTVShowTrailer: (state, action) => {
      state.tvShowTrailer = action.payload;
    },
    removeTVShowTrailer: (state, action) => {
      state.tvShowTrailer = null;
    },
  },
});

export const { addTVShowTrailer, removeTVShowTrailer } = tvShowSlice.actions;
export default tvShowSlice.reducer;
