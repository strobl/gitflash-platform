
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

import { Form } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { createConversation } from '@/services/tavusService';
import { formSchema, FormValues } from './InterviewFormTypes';
import { InterviewFormBasicInfo } from './InterviewFormBasicInfo';
import { InterviewFormPrompts } from './InterviewFormPrompts';
import { InterviewFormConfig } from './InterviewFormConfig';
import { InterviewFormActions } from './InterviewFormActions';

export function InterviewForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      conversation_name: '',
      conversation_context: 'Du bist ein freundlicher Interviewer für eine Stelle in der Baubranche. Stelle relevante Fragen zum Hintergrund, zur Erfahrung und zu den Fähigkeiten des Kandidaten.',
      language: 'de',
      max_call_duration: 600,
      participant_left_timeout: 30,
      participant_absent_timeout: 300,
      replica_id: "r9d30b0e55ac",  // Corrected replica_id
      persona_id: "p5317866",  // Corrected persona_id
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      console.log('Submitting interview with data:', data);
      
      // Create the interview with all form data
      const result = await createConversation({
        conversation_name: data.conversation_name,
        conversation_context: data.conversation_context,
        language: data.language,
        max_call_duration: data.max_call_duration,
        participant_left_timeout: data.participant_left_timeout,
        participant_absent_timeout: data.participant_absent_timeout,
        replica_id: data.replica_id,
        persona_id: data.persona_id
      });
      
      toast.success('Interview erfolgreich erstellt!');
      navigate('/interviews');
    } catch (error) {
      console.error('Failed to create interview:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unbekannter Fehler';
      setErrorMessage(`Fehler beim Erstellen des Interviews: ${errorMsg}`);
      toast.error('Fehler beim Erstellen des Interviews');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Neues KI-Interview erstellen</CardTitle>
        <CardDescription>
          Definieren Sie ein KI-gestütztes Interview für Talente.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <InterviewFormBasicInfo control={form.control} />
            <InterviewFormPrompts control={form.control} />
            <InterviewFormConfig control={form.control} />
          </CardContent>
          
          <CardFooter>
            <InterviewFormActions 
              isSubmitting={isSubmitting} 
              onCancel={() => navigate(-1)} 
            />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
