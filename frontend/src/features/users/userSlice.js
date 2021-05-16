//todo: Do we set this up as a way to track auth?

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteItem, getItems, postNewItem, updateItem} from "../../app/client";

const initialState = {
    user: {
        username: "",
        authorities: [],
        role: "",
        exp: "",
        isTokenValid: false
    }
};

const userSlice = createSlice({
        name: "user",
        initialState,
        reducers: {
            userLoggedIn: {
                reducer(state, action) {
                    state.user = action.payload;
                },
                prepare(user) {
                    return {
                        payload: {
                            ...user
                        }
                    }
                }
            },
            userLoggedOut: {
                reducer(state, action){
                    state.user = initialState;
                }
            }
        }

    }
)

export const {userLoggedIn, userLoggedOut} = userSlice.actions;

export default userSlice.reducer;


export const isUserTokenValid = state => state.user.user.isTokenValid;
export const getUserName = state => state.user.user.username
export const getUserAuthorities = state => state.user.user.authorities
export const getUserRole = state => state.user.user.role;