
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, LogIn, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface LoginPromptProps {
  email: string;
  onClose: () => void;
  onLoginSuccess: (userId: string) => void;
}

export function LoginPrompt({ email, onClose, onLoginSuccess }: LoginPromptProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!password.trim()) {
      toast.error('Bitte geben Sie Ihr Passwort ein.');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        toast.success('Erfolgreich eingeloggt!');
        onLoginSuccess(data.user.id);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Ungültige Login-Daten. Bitte überprüfen Sie Ihr Passwort.');
      } else {
        toast.error('Login fehlgeschlagen. Bitte versuchen Sie es erneut.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 bg-white rounded-2xl overflow-hidden">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="text-center mb-6">
            <LogIn className="w-12 h-12 text-gitflash-primary mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gitflash-primary mb-2">
              Anmeldung erforderlich
            </h2>
            <p className="text-sm text-gitflash-secondary">
              Ein Account mit der E-Mail <strong>{email}</strong> existiert bereits.
              Bitte loggen Sie sich ein, um fortzufahren.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                type="email"
                value={email}
                disabled
                className="w-full h-12 text-base border-gray-200 bg-gray-50"
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-12 text-base border-gray-200 focus:border-gitflash-primary pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-12 bg-gitflash-primary hover:bg-gitflash-secondary text-white font-semibold text-base rounded-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Anmelden</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
