
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { FormValues } from './InterviewFormTypes';

interface InterviewFormConfigProps {
  control: Control<FormValues>;
}

export function InterviewFormConfig({ control }: InterviewFormConfigProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="language">Sprache</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Sprache auswählen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="en">Englisch</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="max_call_duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="max_call_duration">Maximale Interviewdauer (Sekunden)</FormLabel>
              <FormControl>
                <Input 
                  id="max_call_duration" 
                  type="number"
                  min={60}
                  max={3600}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="participant_left_timeout"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="participant_left_timeout">Timeout - Teilnehmer verlässt (Sek.)</FormLabel>
              <FormControl>
                <Input 
                  id="participant_left_timeout" 
                  type="number"
                  min={10}
                  max={300}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="participant_absent_timeout"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="participant_absent_timeout">Timeout - Teilnehmer abwesend (Sek.)</FormLabel>
              <FormControl>
                <Input 
                  id="participant_absent_timeout" 
                  type="number"
                  min={60}
                  max={600}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
