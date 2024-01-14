import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import GptReducer from "./gptSlice";
import configReducer from "./configSlice";
import tvShowReducer from "./tvShowSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: GptReducer,
    config: configReducer,
    tv: tvShowReducer,
  },
});

export default appStore;
