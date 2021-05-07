import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
    cart: []
}

const cartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
            itemAdded: {
                reducer(state, action) {
                    // action.payload should be an item object
                    // if item in cart, increment qty
                    // else concat {...item, qty: 1} to cart
                    let addedItem = action.payload;
                    // finds if the item is already in cart, else is undefined
                    let itemInCart = state.cart.find(({ id }) => id === addedItem.id);

                    itemInCart
                        ? state.cart = (state.cart.map(item =>
                            item.id === addedItem.id
                                ? {...item, qty: item.qty + 1}
                                : item))
                        : (state.cart = state.cart.concat({...action.payload, qty: 1}))
                },

                prepare(item) {
                    return {
                        payload: {
                            ...item
                        }
                    }
                }
            }
        }

    }
);

export const {itemAdded} = cartSlice.actions;

export default cartSlice.reducer;