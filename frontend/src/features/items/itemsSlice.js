import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getProduct} from "../../app/API";

const initialState = {
    items: [],
    status: 'idle'
}

export const fetchItems = createAsyncThunk(
    'products/fetchAll',
    async () => {
        return await getProduct();
    }
)

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchItems.pending]: (state, action) => {
            state.status = 'pending';
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.items = state.items.concat(action.payload);
        },
        [fetchItems.rejected]: (state, action) => {
            state.status = 'rejected';
        }
    }
});

export default itemsSlice.reducer;

export const selectItemById = (state, itemId) => state.items.items.find(item => item.id === itemId);
export const selectAllItems = (state) => state.items.items;
export const itemStatus = (state) => state.items.status;