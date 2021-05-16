import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteItem, getItems, postNewItem, updateItem} from "../../app/client";

const initialState = {
    ducks: [],
    fetchStatus: 'idle',
    addItemStatus: 'idle',
    deleteItemStatus: 'idle',
    updateItemStatus: 'idle',
}

export const fetchItems = createAsyncThunk(
    'items/fetchAll',
    async () => {
        return await getItems();
    }
)

export const addItem = createAsyncThunk(
    'items/addItem',
    async (newItem) => {
        return await postNewItem(newItem);
    }
)

export const itemDeleted = createAsyncThunk(
    'items/itemDeleted',
    async (item) => {
        return await deleteItem(item);
    }
)

export const itemUpdated = createAsyncThunk(
    'items/itemUpdated',
    async (updatedItem) => {
        return await updateItem(updatedItem)
    }
)

const itemsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        nothingWasDone: {
            reducer(state, action) {

            },
            prepare() {
                return {
                    payload: {}
                }
            }
        }

    },
    extraReducers: {
        // ### FETCH ITEMS REDUCER
        [fetchItems.pending]: (state, action) => {
            state.fetchStatus = 'pending';
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.fetchStatus = 'fulfilled';
            state.ducks = action.payload;
        },
        [fetchItems.rejected]: (state, action) => {
            state.fetchStatus = 'rejected';
        },

        // ### ADD ITEM REDUCER
        [addItem.pending]: (state, action) => {
            state.addItemStatus = 'pending';
        },
        [addItem.fulfilled]: (state, action) => {
            state.addItemStatus = 'idle';
            state.ducks = state.ducks.concat(action.payload);
        },
        [addItem.rejected]: (state, action) => {
            state.addItemStatus = 'error';
        },

        // ### DELETE ITEM REDUCER
        [itemDeleted.pending]: (state, action) => {
            state.deleteItemStatus = 'pending';
        },
        [itemDeleted.fulfilled]: (state, action) => {
            state.deleteItemStatus = 'fulfilled';
            state.ducks = state.ducks.filter(item => item.id !== action.meta.arg.id)

        },
        [itemDeleted.rejected]: (state, action) => {
            state.deleteItemStatus = 'rejected';
        },

        [itemUpdated.pending]: (state, action) => {
            state.updateItemStatus = 'pending';
        },
        [itemUpdated.fulfilled]: (state, action) => {
            state.updateItemStatus = 'fulfilled';
            // we map each item in the collection to itself, or the newly updated item if the id matches.
            state.ducks = state.ducks.map(item => item.id === action.payload.id ? action.payload : item);
        }

    }
});

export const {nothingWasDone} = itemsSlice.actions;

export default itemsSlice.reducer;

// ### SELECTOR EXPORTS ###
export const selectItemById = (state, itemId) => {
    return state.products.ducks.find(item => item.id === itemId);
}
export const selectAllItems = (state) => state.products.ducks;
export const fetchItemProgressStatus = (state) => state.products.fetchStatus;
export const addItemProgressStatus = (state) => state.products.addItemStatus;
export const deleteItemProgressStatus = (state) => state.products.deleteItemStatus;