import { Box, Button, Checkbox, FormControlLabel, TextField, FormControl, FormHelperText } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { RegisterFormValues } from "../auth/types";

type Props = {
    onSubmit: (data: RegisterFormValues) => void;
};

export default function RegistrationForm({ onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useFormContext<RegisterFormValues>();

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                fullWidth
                label="Your name"
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
            />

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

            <TextField
                fullWidth
                label="Confirm password"
                type="password"
                margin="normal"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
            />

            <FormControl error={!!errors.terms} sx={{ mt: 1 }}>
                <FormControlLabel
                    control={<Checkbox {...register("terms")} />}
                    label="By signing up I agree to terms and conditions"
                />
                {errors.terms && <FormHelperText>{errors.terms.message}</FormHelperText>}
            </FormControl>

            <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 3, borderRadius: 999 }}
                disabled={!isValid || isSubmitting}
            >
                Register
            </Button>
        </Box>
    );
}
