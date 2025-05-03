
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Star, Loader2, Send } from 'lucide-react';
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
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';

interface FeedbackFormProps {
  sessionId: string;
  interviewId: string;
  onFeedbackSubmitted?: () => void;
  existingFeedback?: {
    id: string;
    score: number;
    comment: string;
  } | null;
}

const formSchema = z.object({
  score: z.number().min(1).max(5),
  comment: z.string().min(10, { message: 'Kommentar muss mindestens 10 Zeichen enthalten' }).max(500),
});

type FormValues = z.infer<typeof formSchema>;

export function FeedbackForm({ 
  sessionId, 
  interviewId, 
  onFeedbackSubmitted,
  existingFeedback = null 
}: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      score: existingFeedback?.score || 0,
      comment: existingFeedback?.comment || '',
    },
  });
  
  const currentRating = form.watch('score');
  
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) {
        toast.error('Sie müssen angemeldet sein, um Feedback zu geben');
        return;
      }
      
      if (existingFeedback) {
        // Aktualisiere bestehendes Feedback
        const { error } = await supabase
          .from('interview_feedback')
          .update({
            score: data.score,
            comment: data.comment,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingFeedback.id);
          
        if (error) throw error;
        toast.success('Feedback erfolgreich aktualisiert');
      } else {
        // Erstelle neues Feedback
        const { error } = await supabase
          .from('interview_feedback')
          .insert({
            session_id: sessionId,
            interview_id: interviewId,
            user_id: userId,
            score: data.score,
            comment: data.comment,
          });
          
        if (error) throw error;
        toast.success('Feedback erfolgreich gesendet');
      }
      
      // Callback aufrufen, wenn vorhanden
      if (onFeedbackSubmitted) {
        onFeedbackSubmitted();
      }
    } catch (error) {
      console.error('Fehler beim Speichern des Feedbacks:', error);
      toast.error('Feedback konnte nicht gespeichert werden');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">Interview-Feedback</h3>
        {existingFeedback && (
          <Badge variant="outline" className="ml-2">Bearbeiten</Badge>
        )}
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bewertung</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        className={`h-8 w-8 cursor-pointer transition-colors ${
                          rating <= (hoveredRating || field.value)
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                        onClick={() => field.onChange(rating)}
                        onMouseEnter={() => setHoveredRating(rating)}
                        onMouseLeave={() => setHoveredRating(0)}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kommentar</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Schreiben Sie einen Kommentar zum Interview..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <div className="text-xs text-muted-foreground text-right mt-1">
                  {field.value?.length || 0}/500
                </div>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || currentRating === 0}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Wird gespeichert...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {existingFeedback ? 'Feedback aktualisieren' : 'Feedback senden'}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
