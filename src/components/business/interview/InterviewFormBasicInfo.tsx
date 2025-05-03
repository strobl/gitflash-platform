
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormValues } from './InterviewFormTypes';

interface InterviewFormBasicInfoProps {
  control: Control<FormValues>;
}

export function InterviewFormBasicInfo({ control }: InterviewFormBasicInfoProps) {
  return (
    <FormField
      control={control}
      name="conversation_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="conversation_name">Titel des Interviews</FormLabel>
          <FormControl>
            <Input 
              id="conversation_name" 
              placeholder="z.B. Bauingenieur Erstgespräch, Projektmanagement Assessment"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
