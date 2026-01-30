import { Drawer, Box, Typography } from "@mui/material";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function FriendsDrawer({ open, onClose }: Props) {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box sx={{ width: 300, p: 3 }}>
                <Typography variant="h6">Friends</Typography>
                {/* later: list friends */}
            </Box>
        </Drawer>
    );
}
