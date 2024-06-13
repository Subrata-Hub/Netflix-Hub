import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import GptReducer from "./gptSlice";
import configReducer from "./configSlice";

import mediaReducer from "./mediaSlice";
import searchReducer from "./searchSlice";
import savedReducer from "./savedSlice";
import { localStorageMiddleware } from "./localStorageMiddleware";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: GptReducer,
    config: configReducer,

    media: mediaReducer,
    search: searchReducer,
    saved: savedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default appStore;
