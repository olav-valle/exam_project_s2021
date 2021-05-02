import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {deleteProduct, getProducts} from "../../app/API";

const initialState = {
    items: [],
    status: 'idle'
}

export const fetchItems = createAsyncThunk(
    'products/fetchAll',
    async () => {
        return await getProducts();
    }
)

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        itemDeleted: {

            reducer(state, action){
                state.items = state.items.filter(item => item.id !== action.payload.id )
                deleteProduct(action.payload.id);
            },

            prepare(id) {
                return {
                    payload: {
                        id
                    }
                }
            }
        }

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
export const {itemDeleted} = itemsSlice.actions;

export default itemsSlice.reducer;

export const selectItemById = (state, itemId) => state.items.items.find(item => item.id === itemId);
export const selectAllItems = (state) => state.items.items;
export const itemStatus = (state) => state.items.status;