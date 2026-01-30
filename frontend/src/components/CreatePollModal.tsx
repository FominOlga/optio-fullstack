import { Modal, Box, Typography } from "@mui/material";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function CreatePollModal({ open, onClose }: Props) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 4,
                    borderRadius: 3,
                    width: 500,
                }}
            >
                <Typography variant="h6">Create poll</Typography>

                {/* form goes here */}
            </Box>
        </Modal>
    );
}
