import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IGenreMovies} from "../../../models/IGenreMovies.ts";
import {genreService} from "../../../services/global.api.service.ts";

type GenreSliceType = {
    moviesGenre: IGenreMovies[],
    tvShowsGenre: IGenreMovies[]
}

const initialState: GenreSliceType = {moviesGenre: [], tvShowsGenre: []};

const loadMovieGenre = createAsyncThunk(
    'genreSlice/loadMovieGenre',
    async (_, thunkAPI) => {

        try {

            const moviesGenre = await genreService.getMoviesGenre().then(value => value)
            return thunkAPI.fulfillWithValue(moviesGenre)
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('Load movies genre error')
        }

    }
)

const loadTvShowGenre = createAsyncThunk(
    'genreSlice/loadTvShowGenre',
    async (_, thunkAPI) => {

        try {
            const tvShowGenre = await genreService.getTvShowsGenre().then(value => value)
            return thunkAPI.fulfillWithValue(tvShowGenre)
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('Load movies genre error')
        }

    }
)

export const genreSlice = createSlice({
    name: 'genreSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(loadMovieGenre.fulfilled, (state, action: PayloadAction<IGenreMovies[]>) => {
            state.moviesGenre = action.payload;
        })
        .addCase(loadMovieGenre.rejected, (state, action) => {
            console.log(state);
            console.log(action);
        })
        .addCase(loadTvShowGenre.fulfilled, (state, action: PayloadAction<IGenreMovies[]>) => {
            state.tvShowsGenre = action.payload;
        })
        .addCase(loadTvShowGenre.rejected, (state, action) => {
            console.log(state);
            console.log(action);
        })
})

export const genreSliceAction = {
    ...genreSlice.actions, loadMovieGenre, loadTvShowGenre
}
