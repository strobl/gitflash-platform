
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { FormValues } from './InterviewFormTypes';

interface InterviewFormBasicInfoProps {
  control: Control<FormValues>;
}

export function InterviewFormBasicInfo({ control }: InterviewFormBasicInfoProps) {
  return (
    <>
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
      
      <FormField
        control={control}
        name="persona_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="persona_id">Interviewer-Persona</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger id="persona_id">
                  <SelectValue placeholder="Persona auswählen" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="p24293d6">Professioneller Personalmanager</SelectItem>
                <SelectItem value="p219a0b2">Technischer Experte</SelectItem>
                <SelectItem value="p098c3e1">Freundlicher Gesprächspartner</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="replica_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="replica_id">Replica ID (optional)</FormLabel>
            <FormControl>
              <Input 
                id="replica_id" 
                placeholder="z.B. re8e740a42"
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
