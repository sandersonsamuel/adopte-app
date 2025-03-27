import { z } from "zod";

enum Sexs {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

enum AgeGroupNames {
  BABY = "BABY",
  YOUNG = "YOUNG",
  ADULT = "ADULT",
  OLD = "OLD",
}

export const createAnimalSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(1, {
      message: "Nome é obrigatório",
    }),
  description: z
    .string({
      required_error: "Descrição é obrigatório",
    })
    .min(1, {
      message: "Descrição é obrigatório",
    }),
  photo: z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
      message: "A imagem deve ter no máximo 10MB",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Apenas imagens são permitidas",
    }),
  sex: z.nativeEnum(Sexs, {
    required_error: "Sexo é obrigatório",
  }),
  castred: z.boolean({
    required_error: "Castrado é obrigatório",
  }),
  weight: z.number({
    required_error: "Peso é obrigatório",
    invalid_type_error: "Peso é obrigatório",
  }),
  age: z.nativeEnum(AgeGroupNames, {
    required_error: "Idade é obrigatório",
  }),
  categoryId: z.string({
    required_error: "Categoria é obrigatório",
  }),
});
