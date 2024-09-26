import { z } from "zod";
 
export const formSchema = z.object({
 name: z.string(),
 email: z.string().email(),
 password: z.string().min(4),
 user_health_detail: z.string(),
});
 
export type FormSchema = typeof formSchema;