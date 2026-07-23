import { Router } from "express";
import { mediaController } from "../controllers/media.controller";
import { upload } from "../middleware/upload.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Upload Image
router.post(
  "/upload",
  authenticate,
  upload.single("image"),
  mediaController.uploadMedia.bind(mediaController)
);

// Get All Images
router.get(
  "/",
  authenticate,
  mediaController.getAllMedia.bind(mediaController)
);

// Get Single Image
router.get(
  "/:id",
  authenticate,
  mediaController.getMediaById.bind(mediaController)
);

// Delete Image
router.delete(
  "/:id",
  authenticate,
  mediaController.deleteMedia.bind(mediaController)
);

export default router;