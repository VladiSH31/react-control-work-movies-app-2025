import type {IMovie} from "../../../models/IMovie.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {moviesService} from "../../../services/global.api.service.ts";
import type {RootState} from "../store.tsx";

type MovieSliceType = {
    movies: IMovie[],
    selectedGenreId: number | null
}

const initialState: MovieSliceType = {movies: [], selectedGenreId: null};

const loadMovies = createAsyncThunk(
    'movieSlice/loadMovies',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const genreId = state.movieSlice.selectedGenreId;
            const movies = await moviesService.getMovies(genreId);
            return thunkAPI.fulfillWithValue(movies)
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('Load movies error')
        }

    }
)

export const movieSlice = createSlice({
    name: "movieSlice",
    initialState: initialState,
    reducers: {
        setSelectedGenreId: (state, action:PayloadAction<number | null>) => {
            state.selectedGenreId = action.payload;
        }
    },
    extraReducers: builder => builder
        .addCase(loadMovies.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
            state.movies = action.payload;
        })
        .addCase(loadMovies.rejected, (state, action) => {
            console.log(state);
            console.log(action)
        })
})

export const movieSliceActions = {
    ...movieSlice.actions, loadMovies
}