
import * as z from 'zod';

// Define the form schema with simplified validations
export const formSchema = z.object({
  conversation_name: z.string().min(3, 'Name must be at least 3 characters'),
  conversation_context: z.string().optional(),
  language: z.string().default('de'),
  max_call_duration: z.coerce.number().int().min(60).max(3600).default(600),
  participant_left_timeout: z.coerce.number().int().min(10).max(300).default(30),
  participant_absent_timeout: z.coerce.number().int().min(60).max(600).default(300),
  replica_id: z.string().default('r9d30b0e55ac'),
  persona_id: z.string().default('p32c3fd65c8c'),
  custom_greeting: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
