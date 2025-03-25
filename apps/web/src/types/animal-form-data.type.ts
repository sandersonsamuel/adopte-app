import { createAnimalSchema } from "@/schemas/create-animal";
import { z } from "zod";

export type AnimalFormData = z.infer<typeof createAnimalSchema>;