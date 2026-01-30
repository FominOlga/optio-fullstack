import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Typography, Alert } from "@mui/material";
import RegistrationForm from "../components/RegistrationForm";
import HeroImage from "../components/HeroImage";
import { AuthHeroButton } from "../components/AuthHeroButton";
import { useForm, FormProvider } from "react-hook-form";
import type { RegisterFormValues } from "../auth/types";
import { useAuth } from "../auth/AuthContext";
import { api } from "../api/client";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../features/auth/auth.schema";

export default function RegisterPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [apiError, setApiError] = useState<string | null>(null);

    const methods = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setApiError(null);
        try {
            const res = await api.post("/auth/register", data);

            login(res.data.data.accessToken);

            navigate("/dashboard");
        } catch (err: any) {
            setApiError(err.message || "Registration failed");
        }
    };

    return (
        <FormProvider {...methods}>
            <Grid container direction="row" minHeight="100vh">
                {/* Left: Form */}
                <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="center" justifyContent="center">
                    <Box width="100%" maxWidth={420} px={3}>
                        <Typography variant="h5" fontWeight={500} mb={4}>
                            Create an account
                        </Typography>

                        {apiError && <Alert severity="error">{apiError}</Alert>}
                        <RegistrationForm onSubmit={onSubmit} />
                    </Box>
                </Grid>

                {/* Right: Image */}
                <HeroImage />
                <AuthHeroButton />
            </Grid>
        </FormProvider>
    );
}
