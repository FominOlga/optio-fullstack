import { z } from "zod";

export const createPollSchema = z.object({
    body: z.object({
        title: z.string().min(3, "Title is too short").max(100),
        images: z.array(z.string().min(1)).length(2, "Exactly two images required"),
    }),
});

export type CreatePollInput = z.infer<typeof createPollSchema>["body"];
