import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    allTimeFavourites: null,
    newIndianMovies: null,
    trending: null,
    trendingShow: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },

    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },

    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },

    addAllTimeFavourites: (state, action) => {
      state.allTimeFavourites = action.payload;
    },

    addNewIndianMovies: (state, action) => {
      state.newIndianMovies = action.payload;
    },

    addTrending: (state, action) => {
      state.trending = action.payload;
    },

    addTrendingShow: (state, action) => {
      state.trendingShow = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addAllTimeFavourites,
  addNewIndianMovies,
  addTrending,
  addTrendingShow,
} = movieSlice.actions;
export default movieSlice.reducer;
