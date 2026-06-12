import { z } from "zod";

export const carouselSchema = z.object({
  title: z.string().optional(),

  durationSec: z.number().min(1),

  isActive: z.boolean().default(true),
}).strict();