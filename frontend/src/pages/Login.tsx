import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import backgroundImageSrc from "../assets/images/hero.jpg";
import { useForm, FormProvider } from "react-hook-form";
import type { LoginFormValues } from "../auth/types";

export default function LoginPage() {
    const methods = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        console.log("Login payload:", data);
        // call API here
    };

    return (
        <FormProvider {...methods}>
            <Grid container direction="row" minHeight="100vh">
                {/* Left: Form */}
                <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="center" justifyContent="center">
                    <Box width="100%" maxWidth={420} px={3}>
                        <Typography variant="h5" fontWeight={500} mb={4}>
                            Log in
                        </Typography>

                        <LoginForm onSubmit={onSubmit} />
                    </Box>
                </Grid>

                {/* Right: Image */}
                <Grid
                    size={{ xs: 0, md: 6 }}
                    sx={{
                        backgroundImage: `url(${backgroundImageSrc})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </Grid>
        </FormProvider>
    );
}
