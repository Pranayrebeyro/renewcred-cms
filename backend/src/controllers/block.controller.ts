import { Request, Response } from "express";
import blockService from "../services/block.service";

// =======================
// Create Block
// =======================
export const createBlock = async (req: Request, res: Response) => {
  try {
    const { pageId, type, data, order } = req.body;

    const block = await blockService.createBlock({
      pageId,
      type,
      data,
      order,
    });

    return res.status(201).json({
      success: true,
      message: "Block created successfully",
      data: block,
    });
  } catch (error: any) {
    console.error("CREATE BLOCK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get All Blocks
// =======================
export const getAllBlocks = async (
  req: Request,
  res: Response
) => {
  try {
    const blocks = await blockService.getAllBlocks();

    return res.status(200).json({
      success: true,
      data: blocks,
    });
  } catch (error: any) {
    console.error("GET ALL BLOCKS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get Blocks by Page
// =======================
export const getBlocks = async (
  req: Request,
  res: Response
) => {
  try {
    const pageId = req.params.pageId;

    const blocks = await blockService.getBlocks(pageId);

    return res.status(200).json({
      success: true,
      data: blocks,
    });
  } catch (error: any) {
    console.error("GET BLOCKS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Update Block
// =======================
export const updateBlock = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    const block = await blockService.updateBlock(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Block updated successfully",
      data: block,
    });
  } catch (error: any) {
    console.error("UPDATE BLOCK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Delete Block
// =======================
export const deleteBlock = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    const result = await blockService.deleteBlock(id);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error("DELETE BLOCK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Reorder Blocks
// =======================
export const reorderBlocks = async (
  req: Request,
  res: Response
) => {
  try {
    const blocks = req.body;

    const result = await blockService.reorderBlocks(blocks);

    return res.status(200).json({
      success: true,
      message: "Blocks reordered successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("REORDER BLOCKS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};