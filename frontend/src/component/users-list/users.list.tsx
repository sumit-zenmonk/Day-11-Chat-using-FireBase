"use client"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { Box, Avatar, Typography, CircularProgress } from "@mui/material"
import { useEffect } from "react"
import { fetchUsers } from "@/redux/feature/User-List/userAction"
import { enqueueSnackbar } from "notistack"
import { selectReciever } from "@/redux/feature/selected-reciever/selected_reciever_slice"

export default function UserListComp() {
    const { users, loading, error } = useSelector(
        (state: RootState) => state.usersReducer
    )
    const dispatch = useDispatch<AppDispatch>()
    const currentSelectedReceieverUUID = useSelector(
        (state: RootState) => state.SelectedReceiverReducer.reciever_uid
    )
    const { user } = useSelector(
        (state: RootState) => state.authReducer
    )

    useEffect(() => {
        const loadData = async () => {
            if (user?.uid) {
                try {
                    await dispatch(fetchUsers(user.uid)).unwrap();
                } catch (err) {
                    console.error("Failed to fetch users:", err);
                }
            }
        };
        loadData();
    }, []);

    const handleSelectConversation = (reciever_uid: string) => {
        dispatch(selectReciever({ reciever_uid }));
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress size={20} />
            </Box>
        )
    }

    if (error) {
        return (
            <Typography color="error">
                {error}
            </Typography>
        )
    }

    return (
        <Box>
            {users.map((user) => (
                <Box
                    key={user.uid}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        padding: 1.5,
                        borderBottom: "1px solid #eee",
                        cursor: "pointer",
                        border: currentSelectedReceieverUUID === user.uid ? "2px solid #ffffff" : "2px solid transparent",
                        "&:hover": { background: "#aaffbe", color: "black" }
                    }}
                    onClick={() => { handleSelectConversation(user.uid) }}
                >
                    <Avatar src={user.photo || ""} />
                    <Box>
                        <Typography fontWeight={600}>
                            {user.name || "Unknown"}
                        </Typography>

                        <Typography fontSize="12px" >
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
            ))}

        </Box>
    )
}