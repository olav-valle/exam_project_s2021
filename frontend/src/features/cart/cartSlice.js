import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    content: [],
    cartStatus: "idle",
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
                    let itemInCart = state.content.find(({id}) => id === addedItem.id);

                    itemInCart
                        //if itemInCart is truthy, we map each item in the cart... ,
                        ? state.content = (state.content.map(item =>
                            item.id === addedItem.id
                                //to itself with qty incremented...
                                ? {...item, qty: item.qty + 1}
                                //or itself unchanged.
                                : item))
                        // if itemInCart is falsy (undefined), item is not already in cart, and we add it
                        : (state.content = state.content.concat({...action.payload, qty: 1}))
                },

                prepare(item) {
                    return {
                        // we make the payload contain the properties of the item object,
                        // and NOT the item object itself.
                        payload: {
                            ...item
                        }
                    }
                }
            },
            itemQuantityChanged: {
                reducer(state, action) {
                    state.content = state.content.map(item =>
                        // find item by id...
                        item.id === action.payload.id
                            // and set its qty value to the input.
                            ? { ...item, qty: parseInt(action.payload.qty) }
                            : item
                    )
                },
                prepare(itemId, qty) {
                    return {
                        payload: {
                            id: itemId,
                            qty
                        }
                    }

                }
            }
        }

    }
);

export const {itemAdded, itemQuantityChanged} = cartSlice.actions;

export default cartSlice.reducer;

// ### EXPORT SELECTORS ###
export const getCartContents = (state) => state.cart.content;

// when using selector functions with parameters other than just 'state'
// we must make sure to pass both the parameter, and 'state' when calling
// the selector.
export const getItemQtyByItemId = (state, itemId) =>
    state.cart.content.find(item => item.id === itemId).qty;
