"use client"
import { Box, Button, Popover, TextField } from "@mui/material";
import EmojiPicker from 'emoji-picker-react';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useState } from "react";
import styles from './sender_comp.module.css';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { sendMessage } from "@/lib/firebaseStore/chatService/chatService";
import { generateConversationId } from "@/utils/conversation";

export default function SenderBoxComp() {
    const [message, setMessage] = useState<string>('');
    const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);
    const { user } = useSelector((state: RootState) => state.authReducer)
    const { reciever_uid } = useSelector((state: RootState) => state.SelectedReceiverReducer)

    const handleEmojiOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }
    const handleSendMessage = async () => {
        if (!message.trim()) return
        if (!user?.uid || !reciever_uid) return

        const conversationId = generateConversationId(
            user.uid,
            reciever_uid
        )
        await sendMessage(
            conversationId,
            user.uid,
            reciever_uid,
            message
        )
        setMessage("")
    }

    return (
        <Box className={styles.wrapper}>
            <Box className={styles.inputWrapper}>
                <TextField
                    fullWidth
                    placeholder="Ready to go"
                    // variant="standard"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Box>

            <Box className={styles.buttonGroup}>
                <Button className={styles.actionButton} onClick={handleEmojiOpen}>
                    <EmojiEmotionsIcon />
                </Button>
                <Button className={styles.actionButton} color="primary" onClick={handleSendMessage}>
                    <SendIcon />
                </Button>
            </Box>

            <Popover
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(undefined)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <EmojiPicker onEmojiClick={(emoji) => setMessage(prev => prev + emoji.emoji)} />
            </Popover>
        </Box>
    )
}