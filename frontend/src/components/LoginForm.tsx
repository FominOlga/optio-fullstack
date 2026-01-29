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
        formState: { errors, isSubmitting },
    } = useFormContext<LoginFormValues>();

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register("email", {
                    required: "Email is required",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("password", {
                    required: "Password is required",
                })}
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
                    disabled={isSubmitting}
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
