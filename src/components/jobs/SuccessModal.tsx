
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Eye, EyeOff, Copy, X } from 'lucide-react';
import { toast } from 'sonner';

interface SuccessModalProps {
  name: string;
  email: string;
  password?: string;
  isNewUser: boolean;
  onClose: () => void;
}

export function SuccessModal({ name, email, password, isNewUser, onClose }: SuccessModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success('Passwort in Zwischenablage kopiert!');
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
          
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-gitflash-success mx-auto mb-4" />
            
            <h2 className="text-2xl font-bold text-gitflash-primary mb-2">
              Bewerbung erfolgreich!
            </h2>
            
            <p className="text-gitflash-secondary mb-6">
              {isNewUser 
                ? `Hallo ${name}! Ihr Account wurde erfolgreich erstellt und Sie sind jetzt eingeloggt.`
                : `Ihre Bewerbung wurde erfolgreich gesendet, ${name}!`
              }
            </p>

            {isNewUser && password && (
              <div className="bg-gitflash-light p-4 rounded-lg mb-6 text-left">
                <h3 className="font-semibold text-gitflash-primary mb-2">
                  Ihre Login-Daten:
                </h3>
                
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gitflash-secondary">E-Mail:</label>
                    <div className="font-mono text-sm bg-white p-2 rounded border">
                      {email}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gitflash-secondary">Passwort:</label>
                    <div className="flex items-center bg-white p-2 rounded border">
                      <span className="font-mono text-sm flex-1">
                        {showPassword ? password : '•'.repeat(password.length)}
                      </span>
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="ml-2 p-1 hover:bg-gray-100 rounded"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={copyPassword}
                        className="ml-1 p-1 hover:bg-gray-100 rounded"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gitflash-secondary mt-3">
                  Bitte notieren Sie sich diese Daten für zukünftige Anmeldungen.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={onClose}
                className="w-full bg-gitflash-primary hover:bg-gitflash-secondary text-white font-semibold"
              >
                {isNewUser ? 'Zum Dashboard' : 'Schließen'}
              </Button>
              
              {isNewUser && (
                <p className="text-xs text-gitflash-secondary">
                  Sie können jetzt alle Features von GitFlash nutzen!
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
