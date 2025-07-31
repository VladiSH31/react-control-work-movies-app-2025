import type {IMovie} from "../../../models/IMovie.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {moviesService} from "../../../services/global.api.service.ts";

type MovieSliceType = {
    movies: IMovie[]
}

const initialState: MovieSliceType = {movies: []};

const loadMovies = createAsyncThunk(
    'movieSlice/loadMovies',
    async (_, thunkAPI) => {
        try {
            const movies = await moviesService.getAll().then(value => value)
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
    reducers: {},
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