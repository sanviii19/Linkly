import express from 'express';
import { getLinkAnalyticsController } from "../controllers/analytics.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const AnalyticsRouter = express.Router();

AnalyticsRouter.get("/:slug", authMiddleware, getLinkAnalyticsController);

export default AnalyticsRouter;