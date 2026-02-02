import { Router } from "express";
import authRoutes from "./auth.routes";
import pollRoutes from "./poll.routes";
import uploadRoutes from "./upload.routes";

const router = Router();

// Mount auth routes at /auth
router.use("/auth", authRoutes);
router.use("/polls", pollRoutes);
router.use("/uploads", uploadRoutes);

export default router;
