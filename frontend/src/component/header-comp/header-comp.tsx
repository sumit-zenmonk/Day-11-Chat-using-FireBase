"use client"
import { usePathname, useRouter } from 'next/navigation';
import { Box, Button } from "@mui/material"
import { logoutUser } from '@/redux/feature/Auth/authAction';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import './header-comp.css'

export default function HeaderComp() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()

    const handleLogOut = () => {
        dispatch(logoutUser())
        router.replace("/login")
    }

    return (
        <header className="header">
            <Box className="left-container">
                <p>Chat-App</p>
            </Box>

            <Box className="right-container">
                <Button
                    variant="contained"
                    onClick={() => router.push(pathname === '/' ? '/chat' : '/')}
                >
                    {pathname === '/' ? 'Chat' : 'Home'}
                </Button>

                <Button
                    variant="contained"
                    color='error'
                    onClick={handleLogOut}
                >
                    Log Out
                </Button>
            </Box>
        </header >
    )
}
