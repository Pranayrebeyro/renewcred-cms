import { z } from "zod";

export const createBlockSchema = z.object({
  pageId: z.string().min(1),
  type: z.string().min(1),
  data: z.any(),
  order: z.number().int().nonnegative(),
});