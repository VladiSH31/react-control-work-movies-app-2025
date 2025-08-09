import {configureStore} from "@reduxjs/toolkit";
import {movieSlice} from "./slices/movieSlice.ts";
import {genreSlice} from "./slices/genreSlice.ts";
import {searchSlice} from "./slices/searchSlice.ts";
import {tvShowsSlice} from "./slices/tvShowsSlice.ts";
import {homeSlice} from "./slices/homeSlice.ts";

export const store = configureStore({
    reducer: {
        movieSlice: movieSlice.reducer,
        tvShowsSlice: tvShowsSlice.reducer,
        genreSlice: genreSlice.reducer,
        searchSlice: searchSlice.reducer,
        homeSlice: homeSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;