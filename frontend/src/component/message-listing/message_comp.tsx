"use client"

import { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { generateConversationId } from "@/utils/conversation"
import { listenMessages } from "@/lib/firebaseStore/chatService/chatService"
import styles from "./message_listing.module.css"
import { getCurrentDateString } from "@/utils/date"

export default function MessageListComp() {
    const [messages, setMessages] = useState<any[]>([])
    const { user } = useSelector((state: RootState) => state.authReducer)
    const { reciever_uid } = useSelector((state: RootState) => state.SelectedReceiverReducer)

    useEffect(() => {
        if (!user?.uid || !reciever_uid) return
        const conversationId = generateConversationId(
            user.uid,
            reciever_uid
        )
        const unsubscribe = listenMessages(
            conversationId,
            setMessages
        )
        return () => unsubscribe()
    }, [reciever_uid])

    return (
        <Box className={styles.container}>
            {messages.map((msg) => {
                const isMe = msg.senderId === user?.uid
                return (
                    <Box
                        key={msg.id}
                        className={`${styles.messageRow} ${isMe ? styles.rowMe : styles.rowThem}`}
                    >
                        <Box className={`${styles.bubble} ${isMe ? styles.bubbleMe : styles.bubbleThem}`}>
                            <Typography className={styles.text}>
                                {msg.text}
                            </Typography>
                            <Typography className={styles.timestamp}>
                                {getCurrentDateString(msg.createdAt)}
                            </Typography>
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}