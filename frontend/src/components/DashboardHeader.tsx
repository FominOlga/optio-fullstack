import { AppBar, Toolbar, Box, Button, Typography, Avatar, Menu, MenuItem, IconButton, Divider } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/client";

type Props = {
    onOpenFriends: () => void;
    onOpenCreatePoll: () => void;
};

export function DashboardHeader({ onOpenFriends, onOpenCreatePoll }: Props) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => setAnchorEl(null);

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            console.log("Logout error:", err);
        }

        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "#fff",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Toolbar sx={{ minHeight: 72 }}>
                {/* Logo */}
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, cursor: "pointer" }}
                    onClick={() => navigate("/dashboard")}
                >
                    Polly
                </Typography>

                {/* Main nav */}
                <Box sx={{ display: "flex", gap: 3, ml: 6 }}>
                    <Button onClick={onOpenFriends}>Friends</Button>
                    <NavItem to="/dashboard/polls">Friends polls</NavItem>
                </Box>

                {/* Right actions */}
                <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
                    <Button variant="outlined" sx={{ borderRadius: 999 }} onClick={onOpenCreatePoll}>
                        Create poll
                    </Button>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography fontWeight={500}>My profile</Typography>

                        <IconButton onClick={handleOpenMenu}>
                            <Avatar src="/avatar.jpg" sx={{ width: 36, height: 36 }} />
                        </IconButton>
                    </Box>

                    {/* Dropdown */}
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem onClick={() => navigate("/dashboard/account")}>Account settings</MenuItem>

                        <Divider />
                        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                            Log out
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
    return (
        <Typography
            component={NavLink}
            to={to}
            sx={{
                textDecoration: "none",
                color: "text.primary",
                fontWeight: 500,
                "&.active": {
                    fontWeight: 700,
                },
            }}
        >
            {children}
        </Typography>
    );
}
