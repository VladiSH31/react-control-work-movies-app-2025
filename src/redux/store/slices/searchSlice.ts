import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {searchService} from "../../../services/global.api.service.ts";
import type {IPaginatedResponse} from "../../../models/IPaginatedResponse.ts";
import type {IMultiSearchResult} from "../../../models/IMultiSearchResult.ts";

type searchSliceType = {
    searchMultiResult: IMultiSearchResult[]
    query: string,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
    totalPages: number
}

const initialState: searchSliceType = {
    searchMultiResult: [],
    query: '',
    status: 'idle',
    error: null,
    totalPages: 1
};

export const searchMulti = createAsyncThunk<IPaginatedResponse<IMultiSearchResult>, { query: string, page: number }>(
    'searchSlice/searchMulti',
    async ({query, page}, thunkAPI) => {
        try {
            return await searchService.searchMulti(query, page);
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
        .addCase(searchMulti.pending, state => {
            state.status = 'loading';
            state.error = null
        })
        .addCase(searchMulti.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.searchMultiResult = action.payload.results;
            state.totalPages = action.payload.total_pages
        })
        .addCase(searchMulti.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string
        })
})
export const searchSliceAction = {
    ...searchSlice.actions, searchMulti
}