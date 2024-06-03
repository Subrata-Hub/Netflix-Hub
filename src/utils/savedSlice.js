import { createSlice } from "@reduxjs/toolkit";

const savedSlice = createSlice({
  name: "saved",
  initialState: {
    savedMovieOrTVShow: [],
  },

  reducers: {
    addMovieOrTVShow: (state, action) => {
      // state.savedMovieOrTVShow.push(action.payload);
      const newItem = {
        ...action.payload,
        addedAt: new Date().toISOString(), // Add the current timestamp
      };
      state.savedMovieOrTVShow.push(newItem);
    },
    removeMovieOrTVShow: (state, action) => {
      const id = action.payload;
      state.savedMovieOrTVShow = state.savedMovieOrTVShow.filter(
        (item) => item.cardMovieId !== id
      );
    },
  },
});

export const { addMovieOrTVShow, removeMovieOrTVShow } = savedSlice.actions;
export default savedSlice.reducer;
