import { Router } from "express";
import { createPoll, getMyPolls, getPollById } from "../controllers/poll.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { createPollSchema } from "../schemas/poll.schema";
import { validate } from "../middleware/validate";

const router = Router();

router.post("/", authMiddleware, validate(createPollSchema), createPoll);
router.get("/mine", authMiddleware, getMyPolls);
router.get("/:id", authMiddleware, getPollById);

export default router;
