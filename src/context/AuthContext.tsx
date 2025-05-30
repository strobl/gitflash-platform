import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getRoleRedirectPath } from '@/utils/routingUtils';

interface UserProfile {
  id: string;
  name: string;
  role: 'user' | 'business' | 'operator';
  // Add other profile fields as needed
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (redirectTo?: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'user' | 'business' | 'operator') => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('🔄 AuthProvider: Current state:', {
    isAuthenticated: !!user,
    userEmail: user?.email,
    profileRole: profile?.role,
    isLoading,
    hasSession: !!session
  });

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    console.log('📝 AuthContext: Fetching profile for user:', userId);
    try {
      // Use a type assertion to bypass TypeScript type checking for the table name
      const { data, error } = await (supabase
        .from('profiles') as any)
        .select('*')
        .eq('id', userId)
        .single();

      console.log('📝 AuthContext: Profile fetch result:', { data, error });

      if (error) {
        console.error('❌ AuthContext: Error fetching profile:', error);
        return null;
      }

      // Make sure the returned data matches our UserProfile interface
      if (data) {
        const userProfile: UserProfile = {
          id: data.id,
          name: data.name,
          role: data.role as 'user' | 'business' | 'operator',
        };
        console.log('✅ AuthContext: Profile created successfully:', userProfile);
        return userProfile;
      }

      console.log('⚠️ AuthContext: No profile data returned');
      return null;
    } catch (error) {
      console.error('❌ AuthContext: Error in fetchProfile:', error);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    console.log('🚀 AuthContext: Setting up auth listener...');
    
    // First, set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔔 AuthContext: Auth state changed:', { event, session: !!session, userEmail: session?.user?.email });
        
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          console.log('👤 AuthContext: User found, fetching profile...');
          // Defer fetching profile with setTimeout to prevent deadlocks
          setTimeout(async () => {
            const profile = await fetchProfile(session.user.id);
            console.log('📝 AuthContext: Setting profile:', profile);
            setProfile(profile);
          }, 0);
        } else {
          console.log('🚫 AuthContext: No user, clearing profile');
          setProfile(null);
        }
        
        setIsLoading(false);
        console.log('✅ AuthContext: Auth state update complete');
      }
    );

    // Then check for existing session
    console.log('🔍 AuthContext: Checking for existing session...');
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔍 AuthContext: Existing session check result:', { session: !!session, userEmail: session?.user?.email });
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('👤 AuthContext: Existing user found, fetching profile...');
        fetchProfile(session.user.id).then(profile => {
          console.log('📝 AuthContext: Initial profile set:', profile);
          setProfile(profile);
        });
      }
      
      setIsLoading(false);
      console.log('✅ AuthContext: Initial auth check complete');
    });

    return () => {
      console.log('🛑 AuthContext: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  // Login with email and password
  const login = async (email: string, password: string) => {
    console.log('🔐 AuthContext: Login attempt for:', email);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      console.log('🔐 AuthContext: Login result:', { data: !!data, error, userEmail: data?.user?.email });

      if (error) throw error;

      if (data.user) {
        console.log('👤 AuthContext: Login successful, fetching profile...');
        const profile = await fetchProfile(data.user.id);
        console.log('📝 AuthContext: Login profile set:', profile);
        setProfile(profile);
      }
      
      toast.success('Erfolgreich angemeldet');
      console.log('✅ AuthContext: Login process complete');
    } catch (error: any) {
      console.error('❌ AuthContext: Login error:', error);
      toast.error(`Fehler beim Anmelden: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async (redirectTo?: string) => {
    setIsLoading(true);
    try {
      // If a specific URL was provided (like for interviews), use that
      // Otherwise, we'll handle the redirect after auth in the component
      const finalRedirectUrl = redirectTo || window.location.origin;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: finalRedirectUrl
        }
      });

      if (error) throw error;
      
      // No need for toast here because the page will redirect to Google
    } catch (error: any) {
      console.error('Google login error:', error);
      toast.error(`Fehler beim Google-Login: ${error.message}`);
      setIsLoading(false);
      throw error;
    }
    // Note: We don't set isLoading to false here as the page will redirect
  };

  // Register new user
  const register = async (name: string, email: string, password: string, role: 'user' | 'business' | 'operator') => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (error) throw error;
      
      toast.success('Konto erfolgreich erstellt');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(`Fehler bei der Registrierung: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setSession(null);
      toast.success('Erfolgreich abgemeldet');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(`Fehler beim Abmelden: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        login,
        loginWithGoogle,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
