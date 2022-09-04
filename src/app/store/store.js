import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "~/components/SearchFeature/searchSlice";
import movieReducer from "~/pages/Movies/movieSlice";
import tvShowReducer from "~/pages/TvShow/tvShowSlice";
import trendingReducer from "~/pages/Home/trendingSlice";
import mediaDetailReducer from "~/components/MediaDetail/mediaDetailSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    movie: movieReducer,
    tv: tvShowReducer,
    trending: trendingReducer,
    mediaDetail: mediaDetailReducer,
  },
});

export default store;
