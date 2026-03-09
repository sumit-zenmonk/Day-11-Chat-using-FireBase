"use client"

import { createSlice } from "@reduxjs/toolkit"
import { UsersState } from "./usertype"
import { fetchUsers } from "./userAction"

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        resetUserList: (state) => {
            state = initialState
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.loading = true
            })

            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })

            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export default usersSlice.reducer