
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  cover_letter: z.string().optional(),
});

interface ApplicationFormProps {
  jobId: string;
  talentId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ApplicationForm({ jobId, talentId, onSuccess, onCancel }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cover_letter: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const { data, error } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          talent_id: talentId,
          status: 'new',
          cover_letter: values.cover_letter || null,
        })
        .select('id');
        
      if (error) throw new Error(error.message);
      
      toast({
        title: 'Bewerbung abgesendet',
        description: 'Deine Bewerbung wurde erfolgreich eingereicht.',
        variant: 'default',
      });
      
      if (onSuccess) onSuccess();
      
    } catch (err) {
      console.error('Error submitting application:', err);
      
      toast({
        title: 'Fehler',
        description: err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Bewerbung absenden</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="cover_letter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anschreiben (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Stelle dich kurz vor und beschreibe, warum du für diese Stelle geeignet bist..." 
                      className="min-h-[200px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Abbrechen
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Wird gesendet...' : 'Bewerbung absenden'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
