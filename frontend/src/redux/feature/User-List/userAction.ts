import { getAllUsers } from "@/lib/firebaseStore/userService/userService"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (uid: string, { rejectWithValue, fulfillWithValue }) => {
        try {
            const users = await getAllUsers(uid);
            return fulfillWithValue(users);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
)