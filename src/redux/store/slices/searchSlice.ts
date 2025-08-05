import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IMovie} from "../../../models/IMovie.ts";
import {moviesService} from "../../../services/global.api.service.ts";
import type {IResponseMoviesModel} from "../../../models/IResponseMoviesModel.ts";

type searchSliceType = {
    searchMovieResult: IMovie[]
    query: string,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
}

const initialState: searchSliceType = {
    searchMovieResult: [],
    query: '',
    status: 'idle',
    error: null
};

export const searchMovie = createAsyncThunk<IResponseMoviesModel<IMovie>, { query: string, page: number }>(
    'searchSlice/searchMovie',
    async ({query, page}, thunkAPI) => {
        try {
            const {data} = await moviesService.getSearchMovie(query, page);
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload
        }
    },
    extraReducers: builder => builder
        .addCase(searchMovie.pending, state => {
            state.status = 'loading';
            state.error = null
        })
        .addCase(searchMovie.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.searchMovieResult = action.payload.results
        })
        .addCase(searchMovie.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string
        })
})
export const searchSliceAction = {
    ...searchSlice.actions, searchMovie
}