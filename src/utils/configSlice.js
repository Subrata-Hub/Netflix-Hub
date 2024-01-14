import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
    mediaType: "movie",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },

    changeMediaType: (state, action) => {
      state.mediaType = action.payload;
    },
  },
});

export const { changeLanguage, changeMediaType } = configSlice.actions;
export default configSlice.reducer;
