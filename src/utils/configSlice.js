import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
    mediaType: "movie",
    showPopup: false,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },

    changeMediaType: (state, action) => {
      state.mediaType = action.payload;
    },

    setShowPopup: (state, action) => {
      state.showPopup = action.payload;
    },
  },
});

export const { changeLanguage, changeMediaType, setShowPopup } =
  configSlice.actions;
export default configSlice.reducer;
