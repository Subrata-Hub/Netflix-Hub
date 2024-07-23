import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieName: null,
    movieResults: null,
    loading: false,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMoviesResult: (state, action) => {
      const { movieName, movieResults, loading } = action.payload;
      state.movieName = movieName;
      state.movieResults = movieResults;
      state.loading = loading;
    },
  },
});

export const { toggleGptSearchView, addGptMoviesResult } = gptSlice.actions;
export default gptSlice.reducer;
