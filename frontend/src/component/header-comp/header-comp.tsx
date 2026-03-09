"use client"
import { usePathname, useRouter } from 'next/navigation';
import { Box, Button, Menu, MenuItem } from "@mui/material"
import { logoutUser } from '@/redux/feature/Auth/authAction';
import { AppDispatch, persistor, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import './header-comp.css'
import { useState } from "react";

export default function HeaderComp() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const { user, error, loading, status } = useSelector(
        (state: RootState) => state.authReducer
    )
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleLogOut = async () => {
        await dispatch(logoutUser()).unwrap();
        localStorage.clear();
        router.replace("/login")
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className="header">
            <Box className="left-container">
                <p>Chat-App</p>
            </Box>

            <Box className="right-container">
                <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                    onClick={handleMenuOpen}
                >
                    Menu
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    slotProps={{
                        paper: {
                            sx: {
                                backgroundColor: "#075e54",
                                color: "white"
                            }
                        }
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            router.push(pathname === '/' ? '/chat' : '/');
                            handleMenuClose();
                        }}
                    >
                        {pathname === '/' ? 'Chat' : 'Home'}
                    </MenuItem>

                    {user ? (
                        <MenuItem
                            sx={{ color: "red" }}
                            onClick={async () => {
                                await handleLogOut();
                                handleMenuClose();
                            }}
                        >
                            Log Out
                        </MenuItem>
                    ) : (
                        <MenuItem
                            onClick={() => {
                                router.push('/login');
                                handleMenuClose();
                            }}
                        >
                            Sign In
                        </MenuItem>
                    )}
                </Menu>
            </Box>
        </header >
    )
}
