
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { createConversation } from '@/services/tavusService';
import { useAuth } from '@/context/AuthContext';

// Define the form schema with validations
const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

export function InterviewForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      conversation_name: '',
      replica_id: '',
      persona_id: '',
      custom_greeting: 'Willkommen zum Interview. Bitte stellen Sie sich kurz vor.',
      conversation_context: 'Du bist ein freundlicher Interviewer für eine Stelle in der Baubranche. Stelle relevante Fragen zum Hintergrund, zur Erfahrung und zu den Fähigkeiten des Kandidaten.',
      language: 'de',
      max_call_duration: 600,
      participant_left_timeout: 30,
      participant_absent_timeout: 300,
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    if (!user) {
      toast.error('Sie müssen angemeldet sein, um ein Interview zu erstellen.');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      console.log('Submitting interview with data:', data);
      console.log('User ID:', user.id);
      
      // Make sure conversation_name is not undefined by using the validated form data
      const result = await createConversation({
        conversation_name: data.conversation_name,
        replica_id: data.replica_id || undefined,
        persona_id: data.persona_id || undefined,
        custom_greeting: data.custom_greeting,
        conversation_context: data.conversation_context,
        language: data.language,
        max_call_duration: data.max_call_duration,
        participant_left_timeout: data.participant_left_timeout,
        participant_absent_timeout: data.participant_absent_timeout
      }, user.id);
      
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
          Definieren Sie ein KI-gestütztes Interview für Talente über die Tavus API.
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
            
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
            
            <FormField
              control={form.control}
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
              control={form.control}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => navigate(-1)}>Abbrechen</Button>
            <Button type="submit" className="bg-gitflash-accent hover:bg-gitflash-accent/90" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wird erstellt...
                </>
              ) : 'Interview erstellen'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
