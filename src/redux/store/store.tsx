import {configureStore} from "@reduxjs/toolkit";
import {movieSlice} from "./slices/movieSlice.ts";
import {genreSlice} from "./slices/genreSlice.ts";

export const store = configureStore({
    reducer: {
        movieSlice: movieSlice.reducer,
        // tvShowSlice: tvShowSlice.reducer,
        genreSlice: genreSlice.reducer,

    }
})

export type RootState = ReturnType<typeof store.getState>;