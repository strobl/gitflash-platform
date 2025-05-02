
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';
import { FormValues } from './InterviewFormTypes';

interface InterviewFormPromptsProps {
  control: Control<FormValues>;
}

export function InterviewFormPrompts({ control }: InterviewFormPromptsProps) {
  return (
    <>
      <FormField
        control={control}
        name="custom_greeting"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="custom_greeting">Begrüßungstext</FormLabel>
            <FormControl>
              <Textarea 
                id="custom_greeting" 
                placeholder="Begrüßungsnachricht für den Kandidaten"
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="conversation_context"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="conversation_context">Interviewkontext & Anweisungen</FormLabel>
            <FormControl>
              <Textarea 
                id="conversation_context" 
                className="min-h-[200px]" 
                placeholder="Geben Sie hier Anweisungen für den KI-Interviewer ein."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
