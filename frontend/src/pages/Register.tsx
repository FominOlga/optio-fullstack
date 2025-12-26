import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import RegistrationForm from "../components/RegistrationForm";
import backgroundImageSrc from "../assets/images/hero.jpg";
import { useForm, FormProvider } from "react-hook-form";
import type { RegisterFormValues } from "../auth/types";

export default function RegisterPage() {
    const methods = useForm<RegisterFormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        console.log("Register payload:", data);
        // call API here
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

                        <RegistrationForm onSubmit={onSubmit} />
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
