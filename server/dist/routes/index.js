import { Router } from "express";
import authRoutes from "./auth-routes.js";
import apiRoutes from "./api/index.js";
import { authenticateToken } from "../middleware/auth.js";
const router = Router();
router.use("/auth", authRoutes);
// ✅ Protect all `/api` routes by requiring authentication
router.use("/api", authenticateToken, apiRoutes);
export default router;
