import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";

import {
  createPage,
  getDashboardStats,
  getAllPages,
  getPageById,
  updatePage,
  deletePage,
  publishPage,
} from "../controllers/page.controller";

const router = Router();

// Create Page
router.post("/", authenticate, createPage);

// Dashboard Statistics
router.get("/dashboard/stats", authenticate, getDashboardStats);

// Get All Pages
router.get("/", authenticate, getAllPages);

// Get Single Page
router.get("/:id", authenticate, getPageById);

// Update Page
router.put("/:id", authenticate, updatePage);

// Delete Page
router.delete("/:id", authenticate, deletePage);

// Publish / Unpublish Page
router.patch("/:id/publish", authenticate, publishPage);

export default router;