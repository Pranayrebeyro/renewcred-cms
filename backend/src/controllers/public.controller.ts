import { Request, Response } from "express";
import {
  getPublishedPages,
  getPublishedPageBySlug,
} from "../services/public.service";

export const getPages = async (
  req: Request,
  res: Response
) => {
  try {
    const pages = await getPublishedPages();

    res.status(200).json({
      success: true,
      data: pages,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch pages",
    });
  }
};

export const getPage = async (
  req: Request,
  res: Response
) => {
  try {
    const slug = String(req.params.slug);

    const page = await getPublishedPageBySlug(slug);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch page",
    });
  }
};