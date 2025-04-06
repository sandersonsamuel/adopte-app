import { z } from "zod";
import { createAnimalSchema } from "./create-animal.schema";

export const updateAnimalSchema = createAnimalSchema.omit({ photo: true });
export type UpdateAnimalFormData = z.infer<typeof updateAnimalSchema>;
