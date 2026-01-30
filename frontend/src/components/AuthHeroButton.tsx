import { Button, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export function AuthHeroButton() {
    const location = useLocation();
    const navigate = useNavigate();

    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";

    // Only show on auth pages
    if (!isLogin && !isRegister) return null;

    const label = isLogin ? "Register" : "Login";
    const target = isLogin ? "/register" : "/login";

    return (
        <Box
            sx={{
                position: "fixed",
                top: 14,
                right: 24,
                zIndex: 1300,
            }}
        >
            <Button variant="outlined" size="large" sx={{ mt: 3, borderRadius: 999 }} onClick={() => navigate(target)}>
                {label}
            </Button>
        </Box>
    );
}
