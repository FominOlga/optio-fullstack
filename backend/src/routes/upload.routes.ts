import { Router } from "express";
import { getUploadUrl } from "../controllers/upload.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/sign", authMiddleware, getUploadUrl);

export default router;
