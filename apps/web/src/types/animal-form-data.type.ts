import { createAnimalSchema } from "@/schemas/create-animal.schema";
import { z } from "zod";

export type AnimalFormData = z.infer<typeof createAnimalSchema>;