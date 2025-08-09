import type {IMovie} from "../../../models/IMovie.ts";
import type {ITvShow} from "../../../models/ITvShow.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesService, tvShowsService} from "../../../services/global.api.service.ts";

type HomeSliceType = {
    trendingMovie: IMovie[],
    popularMovie: IMovie[],
    topRatedMovie: IMovie[],

    trendingTvShows: ITvShow[],
    popularTvShows: ITvShow[],
    topRatedTvShows: ITvShow[],

    status: 'idle' | 'succeeded' | 'loading' | 'failed';
    error: string | null;
}


const initialState: HomeSliceType = {
    trendingMovie: [],
    popularMovie: [],
    topRatedMovie: [],

    trendingTvShows: [],
    popularTvShows: [],
    topRatedTvShows: [],

    status: 'idle',
    error: null
};

const loadHomePageContent = createAsyncThunk(
    'homeSlice/loadHomePageContent',
    async (_, thunkAPI) => {
    try {
        const response = await Promise.all([
            moviesService.getTrending(),
            moviesService.getPopular(),
            moviesService.getTopRated(),
            tvShowsService.getTrending(),
            tvShowsService.getPopular(),
            tvShowsService.getTopRated()
        ])
        return {
            trendingMovie: response[0].results,
            popularMovie: response[1].results,
            topRatedMovie: response[2].results,

            trendingTvShows: response[3].results,
            popularTvShows: response[4].results,
            topRatedTvShows: response[5].results,
        }
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue('Error load content')
    }
}
)

export const homeSlice = createSlice({
    name: 'homeSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(loadHomePageContent.pending, (state) => {
            state.status = 'loading';
            state.error = null
        })
        .addCase(loadHomePageContent.fulfilled, (state, action) => {
            state.status = 'succeeded';
            if (action.payload) {
                state.trendingMovie = action.payload.trendingMovie;
                state.popularMovie = action.payload.popularMovie;
                state.topRatedMovie = action.payload.topRatedMovie;
                state.trendingTvShows = action.payload.trendingTvShows;
                state.popularTvShows = action.payload.popularTvShows;
                state.topRatedTvShows = action.payload.topRatedTvShows
            }
        })
        .addCase(loadHomePageContent.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string
        })
})

export const homeSLiceAction = {
    ...homeSlice.actions, loadHomePageContent
}