import { getAllUsers } from "@/lib/firebaseStore/userService/userService"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (uid: string, { rejectWithValue }) => {
        try {
            const users = await getAllUsers(uid)
            return users
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)