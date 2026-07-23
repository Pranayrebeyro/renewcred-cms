import { Request, Response } from "express";
import { mediaService } from "../services/media.service";

class MediaController {
  async uploadMedia(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
        return;
      }

      const media = await mediaService.uploadMedia({
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`,
      });

      res.status(201).json({
        success: true,
        message: "Media uploaded successfully",
        data: media,
      });
    } catch (error) {
      console.error("UPLOAD MEDIA ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Failed to upload media",
      });
    }
  }

  async getAllMedia(req: Request, res: Response): Promise<void> {
    try {
      const media = await mediaService.getAllMedia();

      res.status(200).json({
        success: true,
        data: media,
      });
    } catch (error) {
      console.error("GET ALL MEDIA ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch media",
      });
    }
  }

  async getMediaById(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);

      const media = await mediaService.getMediaById(id);

      if (!media) {
        res.status(404).json({
          success: false,
          message: "Media not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: media,
      });
    } catch (error) {
      console.error("GET MEDIA ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch media",
      });
    }
  }

  async deleteMedia(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);

      await mediaService.deleteMedia(id);

      res.status(200).json({
        success: true,
        message: "Media deleted successfully",
      });
    } catch (error) {
      console.error("DELETE MEDIA ERROR:", error);

      res.status(404).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete media",
      });
    }
  }
}

export const mediaController = new MediaController();