import { z } from "zod";

export const settingsSchema = z.object({
  siteName: z
    .string()
    .trim()
    .min(1, "Site name is required")
    .max(100, "Site name must not exceed 100 characters"),

  siteDescription: z
    .string()
    .trim()
    .max(500, "Site description must not exceed 500 characters")
    .optional()
    .or(z.literal("")),

  logo: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  favicon: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  contactEmail: z
    .string()
    .trim()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .trim()
    .max(255, "Address is too long")
    .optional()
    .or(z.literal("")),

  facebook: z
    .string()
    .trim()
    .url("Invalid Facebook URL")
    .optional()
    .or(z.literal("")),

  instagram: z
    .string()
    .trim()
    .url("Invalid Instagram URL")
    .optional()
    .or(z.literal("")),

  linkedin: z
    .string()
    .trim()
    .url("Invalid LinkedIn URL")
    .optional()
    .or(z.literal("")),

  twitter: z
    .string()
    .trim()
    .url("Invalid Twitter URL")
    .optional()
    .or(z.literal("")),

  seoTitle: z
    .string()
    .trim()
    .max(60, "SEO title should be less than 60 characters")
    .optional()
    .or(z.literal("")),

  seoDescription: z
    .string()
    .trim()
    .max(160, "SEO description should be less than 160 characters")
    .optional()
    .or(z.literal("")),
});

export type SettingsInput = z.infer<typeof settingsSchema>;