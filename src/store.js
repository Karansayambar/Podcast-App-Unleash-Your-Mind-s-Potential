// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import podcastReducer from "./slices/podcastSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    podcasts: podcastReducer,
  },
});

export default store;
