import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import GptReducer from "./gptSlice";
import configReducer from "./configSlice";
import tvShowReducer from "./tvShowSlice";
import mediaReducer from "./mediaSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: GptReducer,
    config: configReducer,
    tv: tvShowReducer,
    media: mediaReducer,
  },
});

export default appStore;
