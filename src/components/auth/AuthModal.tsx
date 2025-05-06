
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type AuthMode = 'login' | 'register';
type UserRole = 'user' | 'business';

interface AuthModalProps {
  redirectUrl?: string;
}

export function AuthModal({ redirectUrl = '/dashboard' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [error, setError] = useState<string | null>(null);
  
  const { login, register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (mode === 'login') {
        await login(email, password);
        // Redirect wird von Login.tsx gehandhabt
      } else {
        if (!name.trim()) {
          setError('Bitte geben Sie einen Namen ein');
          return;
        }
        await register(name, email, password, role);
        toast.success(`Konto als ${role === 'user' ? 'Talent' : 'Unternehmen'} erstellt`);
      }
    } catch (error) {
      console.error(error);
      setError('Ein Fehler ist aufgetreten');
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <Tabs defaultValue="talent" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger 
            value="talent" 
            onClick={() => setRole('user')}
            className="data-[state=active]:bg-gitflash-primary data-[state=active]:text-white"
          >
            Als Talent
          </TabsTrigger>
          <TabsTrigger 
            value="business" 
            onClick={() => setRole('business')}
            className="data-[state=active]:bg-gitflash-accent data-[state=active]:text-white"
          >
            Als Unternehmen
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="talent">
          <CardHeader>
            <CardTitle>{mode === 'login' ? 'Talent Login' : 'Als Talent registrieren'}</CardTitle>
            <CardDescription>
              Melden Sie sich als Talent an, um Ihre Fähigkeiten zu präsentieren und von Unternehmen gefunden zu werden.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Max Mustermann" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="max@beispiel.de" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-gitflash-primary hover:bg-gitflash-secondary" disabled={isLoading}>
                {isLoading ? 'Wird bearbeitet...' : mode === 'login' ? 'Anmelden' : 'Registrieren'}
              </Button>
              <Button 
                type="button" 
                variant="link" 
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              >
                {mode === 'login' ? 'Noch kein Konto? Registrieren' : 'Bereits registriert? Anmelden'}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="business">
          <CardHeader>
            <CardTitle>{mode === 'login' ? 'Unternehmen Login' : 'Als Unternehmen registrieren'}</CardTitle>
            <CardDescription>
              Melden Sie sich als Unternehmen an, um Talent-Profile einzusehen und KI-Interviews zu erstellen.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="company-name">Firmenname</Label>
                  <Input 
                    id="company-name" 
                    type="text" 
                    placeholder="Musterfirma GmbH" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="business-email">E-Mail</Label>
                <Input 
                  id="business-email" 
                  type="email" 
                  placeholder="kontakt@musterfirma.de" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-password">Passwort</Label>
                <Input 
                  id="business-password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-gitflash-accent hover:bg-gitflash-accent/80" disabled={isLoading}>
                {isLoading ? 'Wird bearbeitet...' : mode === 'login' ? 'Anmelden' : 'Registrieren'}
              </Button>
              <Button 
                type="button" 
                variant="link" 
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              >
                {mode === 'login' ? 'Noch kein Konto? Registrieren' : 'Bereits registriert? Anmelden'}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
