import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  description: z.string().min(3, "Description must have at least 3 characters"),
  priority: z.enum(["low", "medium", "high"]),
});

export type ItemSchema = z.infer<typeof itemSchema>;
