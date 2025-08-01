import type {IMovie} from "../../../models/IMovie.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {moviesService} from "../../../services/global.api.service.ts";
import type {RootState} from "../store.tsx";

type MovieSliceType = {
    movies: IMovie[],
    selectedGenreId: number | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: MovieSliceType = {movies: [], selectedGenreId: null,status: 'idle', error: null,};

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
        .addCase(loadMovies.pending, (state) => {
            state.status = 'loading'; // Встановлюємо статус "завантаження"
            state.error = null;
        })
        .addCase(loadMovies.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
            state.status = 'succeeded';
            state.movies = action.payload;
        })
        .addCase(loadMovies.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Something went wrong';
        })
})

export const movieSliceActions = {
    ...movieSlice.actions, loadMovies
}