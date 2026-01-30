import { Box, Button, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { LoginFormValues } from "../auth/types";

type Props = {
    onSubmit: (data: LoginFormValues) => void;
};

export default function LoginForm({ onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useFormContext<LoginFormValues>();

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                fullWidth
                label="Email address"
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <Box display="flex" gap={2}>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 3, borderRadius: 999 }}
                    disabled={!isValid || isSubmitting}
                >
                    Log in
                </Button>

                <Button
                    type="submit"
                    variant="outlined"
                    fullWidth
                    size="large"
                    sx={{ mt: 3, borderRadius: 999 }}
                    disabled={isSubmitting}
                >
                    Demo Login
                </Button>
            </Box>
        </Box>
    );
}
