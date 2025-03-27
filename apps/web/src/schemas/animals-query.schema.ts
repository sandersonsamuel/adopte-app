import { z } from "zod";

export const animalsQuerySchema = z.object({
  category: z.string().optional(),
  age: z.string().optional(),
  name: z.string().optional(),
  sex: z.string().optional(),
  castrated: z.boolean().optional(),
});
