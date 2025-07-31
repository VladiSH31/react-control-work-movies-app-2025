import {configureStore} from "@reduxjs/toolkit";
import {movieSlice} from "./slices/movieSlice.ts";

export const store = configureStore({
    reducer: {
        movieSlice: movieSlice.reducer,
        // tvShowSlice: tvShowSlice.reducer,
        // genreSlice: genreSlice.reducer,

    }
})