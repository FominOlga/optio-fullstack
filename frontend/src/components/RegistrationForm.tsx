import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import type { RegisterFormValues } from "../auth/types";

type Props = {
    onSubmit: (data: RegisterFormValues) => void;
};

export default function RegistrationForm({ onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useFormContext<RegisterFormValues>();

    const password = useWatch({ control, name: "password" });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                fullWidth
                label="Your name"
                margin="normal"
                {...register("name", {
                    required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
            />

            <TextField
                fullWidth
                label="Email address"
                margin="normal"
                {...register("email", {
                    required: "Email is required",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                {...register("password", {
                    required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <TextField
                fullWidth
                label="Confirm password"
                type="password"
                margin="normal"
                {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value: string) => {
                        if (value !== password) {
                            return "Passwords do not match";
                        }
                        return true;
                    },
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
            />

            <FormControlLabel
                sx={{ mt: 1 }}
                control={<Checkbox {...register("terms")} />}
                label="By signing up I agree to terms and conditions"
            />

            <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 3, borderRadius: 999 }}
                disabled={isSubmitting}
            >
                Register
            </Button>
        </Box>
    );
}
