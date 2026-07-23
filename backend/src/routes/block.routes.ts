import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";

import {
  createBlock,
  getBlocks,
  updateBlock,
  deleteBlock,
  reorderBlocks,
} from "../controllers/block.controller";

const router = Router();

// Create Block
router.post("/", authenticate, createBlock);

// Get Blocks of a Page
router.get("/:pageId", authenticate, getBlocks);

// Reorder Blocks
router.patch("/reorder", authenticate, reorderBlocks);

// Update Block
router.put("/:id", authenticate, updateBlock);

// Delete Block
router.delete("/:id", authenticate, deleteBlock);

export default router;