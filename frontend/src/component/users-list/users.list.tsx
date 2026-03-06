"use client"

import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Box, Avatar, Typography, CircularProgress } from "@mui/material"

export default function UserListComp() {
    const { users, loading, error } = useSelector(
        (state: RootState) => state.usersReducer
    )

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
                        "&:hover": { background: "#f7f7f7" }
                    }}
                >
                    <Avatar src={user.photo || ""} />

                    <Box>
                        <Typography fontWeight={600}>
                            {user.name || "Unknown"}
                        </Typography>

                        <Typography fontSize="12px" color="gray">
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
            ))}

        </Box>
    )
}