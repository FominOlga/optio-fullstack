import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getMyPolls } from "../api/polls";
import { PollCard } from "./PollCard";

type Poll = {
    _id: string;
    title: string;
    images: string[];
};

export function PollCarousel() {
    const [polls, setPolls] = useState<Poll[]>([]);

    useEffect(() => {
        getMyPolls().then((res) => setPolls(res.data.data));
    }, []);

    return (
        <Box mb={6}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h5">Polls ({polls.length})</Typography>

                <Button variant="contained" sx={{ borderRadius: 999 }}>
                    Create poll
                </Button>
            </Box>

            {/* Horizontal scroll */}
            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    overflowX: "auto",
                    pb: 2,
                    scrollSnapType: "x mandatory",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {polls.map((poll) => (
                    <Box
                        key={poll._id}
                        sx={{
                            minWidth: 300,
                            scrollSnapAlign: "start",
                        }}
                    >
                        <PollCard poll={poll} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
