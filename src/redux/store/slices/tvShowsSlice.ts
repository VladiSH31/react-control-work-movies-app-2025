import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store.tsx";
import type {ITvShow} from "../../../models/ITvShow.ts";
import type {ITvShowDetails} from "../../../models/ITvShowDetails/ITvShowDetails.ts";
import {tvShowsService} from "../../../services/global.api.service.ts";
import type {IPaginatedResponse} from "../../../models/IPaginatedResponse.ts";

type tvShowsSliceType = {
    tvShows: ITvShow[],
    selectedGenreId: number | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
    currentPage: number,
    totalPages: number,
    tvShowDetails: ITvShowDetails | null,
    tvShowDetailsStatus: 'idle' | 'loading' | 'succeeded' | 'failed',
    tvShowDetailsError: string | null
}

const initialState: tvShowsSliceType = {
    tvShows: [],
    selectedGenreId: null,
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 0,
    tvShowDetails: null,
    tvShowDetailsStatus: 'idle',
    tvShowDetailsError: null
};

const loadTvShows = createAsyncThunk<
    IPaginatedResponse<ITvShow>, // Тип для успішного результату
    number,                      // Тип для вхідного аргументу 'page'
    {
        state: RootState,        // Тип для thunkAPI.getState()
        rejectValue: string      // Тип для thunkAPI.rejectWithValue()
    }
>(
    'tvShowsSlice/loadTvShows',
    async (page, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const genreId = state.tvShowsSlice.selectedGenreId;
            const tvShows = await tvShowsService.getTvShows(page, genreId);
            return thunkAPI.fulfillWithValue(tvShows)
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('Load movies error')
        }

    }
)

const loadTvShowById = createAsyncThunk<ITvShowDetails, string, { rejectValue: string }>(
    'tvShowsSlice/loadTvShowById',
    async (id: string, thunkAPI) => {
        try {
            return await tvShowsService.getById(id);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('Failed to fetch movie details')
        }
    })

export const tvShowsSlice = createSlice({
    name: "tvShowsSlice",
    initialState: initialState,
    reducers: {
        setSelectedGenreId: (state, action: PayloadAction<number | null>) => {
            state.selectedGenreId = action.payload;
        }
    },
    extraReducers: builder => builder
        .addCase(loadTvShows.pending, (state) => {
            state.status = 'loading'; // Встановлюємо статус "завантаження"
            state.error = null;
        })
        .addCase(loadTvShows.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.tvShows = action.payload.results;
            state.currentPage = action.payload.page;
            state.totalPages = action.payload.total_pages;
        })
        .addCase(loadTvShows.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Something went wrong';
        })
        .addCase(loadTvShowById.pending, (state) => {
            state.tvShowDetailsStatus = 'loading';
            state.tvShowDetailsError = null;
        })
        .addCase(loadTvShowById.fulfilled, (state, action) => {
            state.tvShowDetails = action.payload;
            state.tvShowDetailsStatus = 'succeeded';
        })
        .addCase(loadTvShowById.rejected, (state, action) => {
            state.tvShowDetailsStatus = 'failed';
            state.tvShowDetailsError = action.payload || 'Error load movie'
        })
})

export const tvShowsSliceActions = {
    ...tvShowsSlice.actions, loadTvShows, loadTvShowById
}