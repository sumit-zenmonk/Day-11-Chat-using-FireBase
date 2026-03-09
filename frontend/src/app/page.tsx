"use client"

import styles from "./home.module.css"
import { RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useSelector } from "react-redux"

import {
  Avatar,
  Box,
  Button,
  Card,
  Typography
} from "@mui/material"

export default function Home() {
  const { user, loading } = useSelector((state: RootState) => state.authReducer)
  const router = useRouter()

  if (loading) {
    return <Box className={styles.container}>Loading...</Box>;
  }

  return (
    <Box className={styles.container}>
      <Card className={styles.cardWrapper} elevation={3}>
        {user ? (
          <>

            <Box className={styles.infoRow}>
              <Avatar
                src={user.photo || undefined}
              >
                {!user.photo && <PersonOutlineOutlinedIcon />}
              </Avatar>
            </Box>

            <Box className={styles.infoRow}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{user.email}</span>
            </Box>

            <Box className={styles.infoRow}>
              <span className={styles.label}>Name:</span>
              <span className={styles.value}>{user.name || user.email}</span>
            </Box>

            <Box className={styles.infoRow}>
              <span className={styles.label}>UID:</span>
              <span className={styles.value}>{user.uid}</span>
            </Box>

            <Button
              variant="contained"
              className={styles.logoutBtn}
              onClick={() => router.push('/chat')}
            >
              Let's Discuss
            </Button>
          </>
        ) : (
          <Typography>Credentials not found</Typography>
        )}
      </Card>
    </Box>
  )
}