import { animalsQuerySchema } from "@/schemas/animals-query.schema";
import { z } from "zod";

export type AnimalsQueryParamsType = z.infer<typeof animalsQuerySchema>;
