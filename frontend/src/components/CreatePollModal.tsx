import { Modal, Box, Typography, TextField, Button, Grid, Stack } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { api } from "../api/client";

type Props = {
    open: boolean;
    onClose: () => void;
};

type UploadedImage = {
    file: File;
    preview: string;
    s3Key?: string;
};

export function CreatePollModal({ open, onClose }: Props) {
    const [title, setTitle] = useState("");
    const [images, setImages] = useState<(UploadedImage | null)[]>([null, null]);
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!images[0] || !images[1]) return;

        console.log("Submitting poll:", { title, images });
        setLoading(true);

        const uploadedKeys: string[] = [];

        for (const img of images) {
            const { data } = await api.post("/uploads/sign", {
                contentType: img!.file.type,
            });

            await fetch(data.uploadUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": img!.file.type,
                },
                body: img!.file,
            });

            uploadedKeys.push(data.key);
        }

        await api.post("/polls", {
            title,
            images: uploadedKeys,
        });

        setLoading(false);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    m: "auto",
                    maxWidth: 600,
                    maxHeight: 400,
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    p: 4,
                    width: "90%",
                }}
            >
                <Typography variant="h6" mb={3} textAlign="center">
                    Create a poll
                </Typography>

                <Stack spacing={3}>
                    <TextField
                        label="Question"
                        placeholder="Enter your question"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Grid container spacing={2}>
                        {[0, 1].map((idx) => (
                            <DropzoneSquare key={idx} index={idx} images={images} setImages={setImages} />
                        ))}
                    </Grid>

                    <Button variant="contained" disabled={loading || !images[0] || !images[1]} onClick={onSubmit}>
                        Create Poll
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}

function DropzoneSquare({ index, images, setImages }: any) {
    const file = images[index];

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        maxFiles: 1,
        onDrop: (accepted) => {
            const newImg = accepted[0];

            setImages((prev: any[]) => {
                const copy = [...prev];
                copy[index] = {
                    file: newImg,
                    preview: URL.createObjectURL(newImg),
                };
                return copy;
            });
        },
    });

    return (
        <Grid size={6}>
            <Box
                {...getRootProps()}
                sx={{
                    height: 180,
                    border: "2px dashed",
                    borderColor: "divider",
                    borderRadius: 2,
                    cursor: "pointer",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": { bgcolor: "action.hover" },
                }}
            >
                <input {...getInputProps()} />

                {file ? (
                    <Box
                        component="img"
                        src={file.preview}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    <Typography variant="body2">Drop image here</Typography>
                )}
            </Box>
        </Grid>
    );
}
