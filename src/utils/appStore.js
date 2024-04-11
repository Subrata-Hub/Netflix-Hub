import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import GptReducer from "./gptSlice";
import configReducer from "./configSlice";

import mediaReducer from "./mediaSlice";
import searchReducer from "./searchSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: GptReducer,
    config: configReducer,

    media: mediaReducer,
    search: searchReducer,
  },
});

export default appStore;
