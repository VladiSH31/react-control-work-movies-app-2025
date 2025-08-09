import type {IMovie} from "../../../models/IMovie.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {moviesService} from "../../../services/global.api.service.ts";
import type {RootState} from "../store.tsx";
import type {IResponseMoviesModel} from "../../../models/IResponseMoviesModel.ts";
import type {IMovieDetails} from "../../../models/IMovieDetails/IMovieDetails.ts";

type MovieSliceType = {
    movies: IMovie[],
    selectedGenreId: number | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
    currentPage: number,
    totalPages: number,
    movieDetails: IMovieDetails | null,
    movieDetailsStatus: 'idle' | 'loading' | 'succeeded' | 'failed',
    movieDetailsError: string | null
}

const initialState: MovieSliceType = {
    movies: [],
    selectedGenreId: null,
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 0,
    movieDetails: null,
    movieDetailsStatus: 'idle',
    movieDetailsError: null
};

const loadMovies = createAsyncThunk<
    IResponseMoviesModel<IMovie>, // Тип для успішного результату
    number,                      // Тип для вхідного аргументу 'page'
    {
        state: RootState,        // Тип для thunkAPI.getState()
        rejectValue: string      // Тип для thunkAPI.rejectWithValue()
    }
>(
    'movieSlice/loadMovies',
    async (page, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const genreId = state.movieSlice.selectedGenreId;
            const movies = await moviesService.getMovies(page, genreId);
            return thunkAPI.fulfillWithValue(movies)
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('Load movies error')
        }

    }
)

const loadMovieById = createAsyncThunk<IMovieDetails, string, { rejectValue: string }>(
    'movieSlice/loadMovieById',
    async (id: string, thunkAPI) => {
        try {
            return await moviesService.getById(id);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('Failed to fetch movie details')
        }
    })

export const movieSlice = createSlice({
    name: "movieSlice",
    initialState: initialState,
    reducers: {
        setSelectedGenreId: (state, action: PayloadAction<number | null>) => {
            state.selectedGenreId = action.payload;
        }
    },
    extraReducers: builder => builder
        .addCase(loadMovies.pending, (state) => {
            state.status = 'loading'; // Встановлюємо статус "завантаження"
            state.error = null;
        })
        .addCase(loadMovies.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.movies = action.payload.results;
            state.currentPage = action.payload.page;
            state.totalPages = action.payload.total_pages;
        })
        .addCase(loadMovies.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Something went wrong';
        })
        .addCase(loadMovieById.pending, (state) => {
            state.movieDetailsStatus = 'loading';
            state.movieDetailsError = null;
        })
        .addCase(loadMovieById.fulfilled, (state, action) => {
            state.movieDetails = action.payload;
            state.movieDetailsStatus = 'succeeded';
        })
        .addCase(loadMovieById.rejected, (state, action) => {
            state.movieDetailsStatus = 'failed';
            state.movieDetailsError = action.payload || 'Error load movie'
        })
})

export const movieSliceActions = {
    ...movieSlice.actions, loadMovies, loadMovieById
}