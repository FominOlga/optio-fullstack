import { Component, ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, info: unknown) {
        console.error("React error boundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box p={6} textAlign="center">
                    <Typography variant="h5" mb={2}>
                        Something went wrong
                    </Typography>
                    <Typography color="text.secondary" mb={4}>
                        Please refresh the page or try again later.
                    </Typography>

                    <Button variant="contained" onClick={() => window.location.reload()}>
                        Reload
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}
