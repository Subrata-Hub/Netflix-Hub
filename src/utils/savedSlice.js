import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("savedState");
    if (serializedState === null) {
      return { savedMovieOrTVShow: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { savedMovieOrTVShow: [] };
  }
};

const savedSlice = createSlice({
  name: "saved",
  initialState: loadState(),
  reducers: {
    addMovieOrTVShow: (state, action) => {
      const newItem = {
        ...action.payload,
        addedAt: new Date().toISOString(),
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
