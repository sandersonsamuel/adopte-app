import { loginSchema } from "@/schemas/login.schema";
import { z } from "zod";

export type LoginFormData = z.infer<typeof loginSchema>;
