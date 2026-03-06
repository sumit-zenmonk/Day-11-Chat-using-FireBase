"use client"

import { Box } from "@mui/material"
import styles from "./chat.module.css";
import UserListComp from "@/component/users-list/users.list";

export default function ChatPage() {
    return (
        <Box className={styles.main}>
            <Box className={styles.left_container}>
                <UserListComp />
            </Box>
            <Box className={styles.right_container}>
                <></>
            </Box>
        </Box>
    )
}