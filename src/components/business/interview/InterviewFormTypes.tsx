
import * as z from 'zod';

// Define the form schema with validations
export const formSchema = z.object({
  conversation_name: z.string().min(3, 'Name must be at least 3 characters'),
  replica_id: z.string().optional(),
  persona_id: z.string().optional(),
  custom_greeting: z.string().optional(),
  conversation_context: z.string().optional(),
  language: z.string().default('de'),
  max_call_duration: z.coerce.number().int().min(60).max(3600).default(600),
  participant_left_timeout: z.coerce.number().int().min(10).max(300).default(30),
  participant_absent_timeout: z.coerce.number().int().min(60).max(600).default(300),
});

export type FormValues = z.infer<typeof formSchema>;
