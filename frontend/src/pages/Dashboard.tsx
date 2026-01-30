import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { FriendsDrawer } from "../components/FriendsDrawer";
import { CreatePollModal } from "../components/CreatePollModal";

export default function DashboardLayout() {
    const [friendsOpen, setFriendsOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <>
            <DashboardHeader onOpenFriends={() => setFriendsOpen(true)} onOpenCreatePoll={() => setCreateOpen(true)} />

            <FriendsDrawer open={friendsOpen} onClose={() => setFriendsOpen(false)} />

            <CreatePollModal open={createOpen} onClose={() => setCreateOpen(false)} />

            <Box sx={{ p: 4 }}>
                <Outlet />
            </Box>
        </>
    );
}
