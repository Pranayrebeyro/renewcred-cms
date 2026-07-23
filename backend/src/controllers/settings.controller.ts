import { Request, Response } from "express";
import { settingsSchema } from "../validators/settings.validator";
import {
  getSettings,
  updateSettings,
} from "../services/settings.service";

export async function getSettingsController(
  req: Request,
  res: Response
) {
  try {
    const settings = await getSettings();

    return res.status(200).json(settings);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch settings.",
    });
  }
}

export async function updateSettingsController(
  req: Request,
  res: Response
) {
  try {
    const validatedData = settingsSchema.parse(req.body);

    const settings = await updateSettings(validatedData);

    return res.status(200).json({
      message: "Settings updated successfully.",
      settings,
    });
  } catch (error: any) {
    console.error(error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed.",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      message: "Failed to update settings.",
    });
  }
}