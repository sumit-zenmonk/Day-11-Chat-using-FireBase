"use client"

<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { Box, Avatar, Typography, CircularProgress } from "@mui/material"
import { useEffect } from "react"
import { fetchUsers } from "@/redux/feature/User-List/userAction"
import { enqueueSnackbar } from "notistack"
import { selectReciever } from "@/redux/feature/selected-reciever/selected_reciever_slice"
=======
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Box, Avatar, Typography, CircularProgress } from "@mui/material"
>>>>>>> 26131aa5fe27c928cadac00decb7587a1f19c6b2

export default function UserListComp() {
    const { users, loading, error } = useSelector(
        (state: RootState) => state.usersReducer
    )
<<<<<<< HEAD
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
=======
>>>>>>> 26131aa5fe27c928cadac00decb7587a1f19c6b2

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
<<<<<<< HEAD
=======

>>>>>>> 26131aa5fe27c928cadac00decb7587a1f19c6b2
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
<<<<<<< HEAD
                        border: currentSelectedReceieverUUID === user.uid ? "2px solid #ffffff" : "2px solid transparent",
                        "&:hover": { background: "#aaffbe", color: "black" }
                    }}
                    onClick={() => { handleSelectConversation(user.uid) }}
                >
                    <Avatar src={user.photo || ""} />
=======
                        "&:hover": { background: "#f7f7f7" }
                    }}
                >
                    <Avatar src={user.photo || ""} />

>>>>>>> 26131aa5fe27c928cadac00decb7587a1f19c6b2
                    <Box>
                        <Typography fontWeight={600}>
                            {user.name || "Unknown"}
                        </Typography>

<<<<<<< HEAD
                        <Typography fontSize="12px" >
=======
                        <Typography fontSize="12px" color="gray">
>>>>>>> 26131aa5fe27c928cadac00decb7587a1f19c6b2
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
            ))}

        </Box>
    )
}