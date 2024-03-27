import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    // trailerVideo: null,
    popularMovies: null,
    topRatedMovies: null,
    upComingMovies: null,
    // movieTrailer: null,
    trending: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    // addTrailerVideo: (state, action) => {
    //   state.trailerVideo = action.payload;
    // },

    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },

    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },

    addUpComingMovies: (state, action) => {
      state.upComingMovies = action.payload;
    },

    // addMovieTrailer: (state, action) => {
    //   state.movieTrailer = action.payload;
    // },
    addTrending: (state, action) => {
      state.trending = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  // addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpComingMovies,
  // addMovieTrailer,
  addTrending,
} = movieSlice.actions;
export default movieSlice.reducer;
