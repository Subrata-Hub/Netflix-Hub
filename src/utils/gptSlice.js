import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieName: null,
    movieResults: [],
    loading: false,
    hasSearched: false,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMoviesResult: (state, action) => {
      const { movieName, movieResults, loading, hasSearched } = action.payload;
      state.movieName = movieName;
      state.movieResults = movieResults;
      state.loading = loading;
      state.hasSearched = hasSearched;
    },
  },
});

export const { toggleGptSearchView, addGptMoviesResult } = gptSlice.actions;
export default gptSlice.reducer;
