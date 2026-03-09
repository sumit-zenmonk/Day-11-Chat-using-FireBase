"use client"

import { Box } from "@mui/material"
import styles from "./chat.module.css";
import UserListComp from "@/component/users-list/users.list";
import MessageComp from "@/component/message-listing/message_comp";
import SenderBoxComp from "@/component/sender-box/sender_comp";

export default function ChatPage() {
    return (
        <Box className={styles.main}>
            <Box className={styles.left_container}>
                <UserListComp />
            </Box>
            <Box className={styles.right_container}>
                <Box className={styles.message_comp}>
                    <MessageComp />
                </Box>
                <Box className={styles.sender_comp}>
                    <SenderBoxComp />
                </Box>
            </Box>
        </Box>
    )
}