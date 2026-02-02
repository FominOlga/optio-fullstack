import { Card, CardContent, Typography, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

type Poll = {
    _id: string;
    title: string;
    images: string[];
};

type Props = {
    poll: Poll;
};

export function PollCard({ poll }: Props) {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 2,
                cursor: "pointer",
            }}
            onClick={() => navigate(`/dashboard/polls/${poll._id}`)}
        >
            {/* Images */}
            <Box display="grid" gridTemplateColumns="1fr 1fr">
                {poll.images.map((img) => (
                    <Box
                        key={img}
                        component="img"
                        src={img}
                        sx={{
                            height: 180,
                            width: "100%",
                            objectFit: "cover",
                        }}
                    />
                ))}
            </Box>

            <CardContent>
                <Typography fontWeight={600} textAlign="center" mb={1}>
                    {poll.title}
                </Typography>

                {/* Votes placeholder */}
                <Box display="flex" justifyContent="center" gap={4}>
                    <VoteCount count={1} />
                    <VoteCount count={0} />
                </Box>
            </CardContent>
        </Card>
    );
}

function VoteCount({ count }: { count: number }) {
    return (
        <Box display="flex" alignItems="center" gap={1}>
            <FavoriteIcon sx={{ color: "error.main" }} />
            <Typography>{count}</Typography>
        </Box>
    );
}
