import { createSlice } from "@reduxjs/toolkit";

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    mediaInfo: null,
    mediaVideos: null,
    similar: null,
    recommendations: null,
    mediaTrailer: null,
  },

  reducers: {
    addMediaInfo: (state, action) => {
      state.mediaInfo = action.payload;
    },
    addMediaVideo: (state, action) => {
      state.mediaVideos = action.payload;
    },

    addSimilar: (state, action) => {
      state.similar = action.payload;
    },

    addrecommendations: (state, action) => {
      state.recommendations = action.payload;
    },

    addMediaTrailer: (state, action) => {
      state.mediaTrailer = action.payload;
    },
  },
});

export const {
  addMediaInfo,
  addMediaVideo,
  addSimilar,
  addrecommendations,
  addMediaTrailer,
} = mediaSlice.actions;
export default mediaSlice.reducer;
