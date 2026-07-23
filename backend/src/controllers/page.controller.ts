import { Request, Response } from "express";
import pageService from "../services/page.service";

// Create Page
export const createPage = async (req: Request, res: Response) => {
  try {
    const page = await pageService.createPage(req.body);

    return res.status(201).json({
      success: true,
      data: page,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Dashboard Statistics
export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const stats = await pageService.getDashboardStats();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Pages
export const getAllPages = async (
  req: Request,
  res: Response
) => {
  try {
    const pages = await pageService.getAllPages();

    return res.status(200).json({
      success: true,
      data: pages,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Page
export const getPageById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const page = await pageService.getPageById(id);

    return res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Page
export const updatePage = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const page = await pageService.updatePage(id, req.body);

    return res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Page
export const deletePage = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const result = await pageService.deletePage(id);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Publish / Unpublish Page
export const publishPage = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const page = await pageService.publishPage(id);

    return res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};