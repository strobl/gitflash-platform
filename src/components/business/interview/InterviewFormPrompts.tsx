
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';
import { FormValues } from './InterviewFormTypes';

interface InterviewFormPromptsProps {
  control: Control<FormValues>;
}

export function InterviewFormPrompts({ control }: InterviewFormPromptsProps) {
  return (
    <FormField
      control={control}
      name="conversation_context"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="conversation_context">Anweisungen für den KI-Interviewer</FormLabel>
          <FormControl>
            <Textarea 
              id="conversation_context" 
              className="min-h-[200px]" 
              placeholder="Beschreiben Sie hier, wie der KI-Interviewer agieren und welche Fragen er stellen soll."
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
