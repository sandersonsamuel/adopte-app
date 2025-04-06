import { z } from "zod";

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export const createCategorySchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
      invalid_type_error: "Nome deve ser uma string",
    })
    .min(3, {
      message: "Nome deve ter pelo menos 3 caracteres",
    }),
});
