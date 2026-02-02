import { useState } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { FriendsDrawer } from "../components/FriendsDrawer";
import { CreatePollModal } from "../components/CreatePollModal";
import { PollCarousel } from "../components/PollCarousel";

export default function DashboardLayout() {
    const [friendsOpen, setFriendsOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <>
            <DashboardHeader onOpenFriends={() => setFriendsOpen(true)} onOpenCreatePoll={() => setCreateOpen(true)} />
            <FriendsDrawer open={friendsOpen} onClose={() => setFriendsOpen(false)} />
            <CreatePollModal open={createOpen} onClose={() => setCreateOpen(false)} />
            <PollCarousel />
        </>
    );
}
