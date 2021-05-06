import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteItem, getItems, postNewItem} from "../../app/client";

const initialState = {
    items: [],
    fetchStatus: 'idle',
    addItemStatus: 'idle',
    deleteItemStatus: 'idle',
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

export const itemDelete = createAsyncThunk(
    'items/itemDeleted',
    async (itemId) => {
        return await deleteItem(itemId);
    }
)

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
    },
    extraReducers: {
        // ### FETCH ITEMS REDUCER
        [fetchItems.pending]: (state, action) => {
            state.fetchStatus = 'pending';
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.fetchStatus = 'fulfilled';
            state.items = action.payload;
        },
        [fetchItems.rejected]: (state, action) => {
            state.fetchStatus = 'rejected';
        },

        // ### ADD ITEM REDUCER
        [addItem.pending]: (state, action) => {
            state.addItemStatus = 'pending';
        },
        [addItem.fulfilled]: (state, action) => {
            state.addItemStatus = 'idle';selectAllItems
            state.fetchStatus = 'idle';
        },
        [addItem.rejected]: (state, action) => {
            state.addItemStatus = 'error';
            // todo: implement reducer to reset this status to 'idle'
            //  after error has been handled
        },

        // ### DELETE ITEM REDUCER
        [itemDelete.pending]: (state, action) => {
            state.deleteItemStatus = 'pending';
        },
        [itemDelete.fulfilled]: (state, action) => {
            state.deleteItemStatus = 'fulfilled';
            state.fetchStatus = 'idle';
            // here we re-fetch the DB from the server after a delete.
            // This keeps local and server in sync, but also causes
            // potentially unnecessary traffic...
            // This should ideally be implemented using some sort of caching,
            // or other means to check if local store matches server DB. For now,
            // we live with the fact that this is suboptimal, since cache validation is hard,
            // and this project doesn't produce a lot of data traffic.
        },
        [itemDelete.rejected]: (state, action) => {
            state.deleteItemStatus = 'rejected';
            // todo: handle this error somehow? Warning/confirmation modal?
        }

    }
});

export const {} = itemsSlice.actions;

export default itemsSlice.reducer;

// ### SELECTOR EXPORTS ###
export const selectItemById = (state, itemId) => state.items.items.find(item => item.id === itemId);
export const selectAllItems = (state) => state.items.items;
export const fetchItemProgressStatus = (state) => state.items.fetchStatus;
export const addItemProgressStatus = (state) => state.items.addItemStatus;
export const deleteItemProgressStatus = (state) => state.items.deleteItemStatus;