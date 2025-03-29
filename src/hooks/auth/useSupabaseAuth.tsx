
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { User, AuthContextType } from "./types";

type SupabaseUser = {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
  app_metadata?: any;
};

// Context for auth state
export const SupabaseAuthContext = createContext<AuthContextType | undefined>(undefined);

// Convert Supabase user to our app's user model
const mapSupabaseUser = (supabaseUser: SupabaseUser | null): User | null => {
  if (!supabaseUser) return null;
  
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
    photoURL: supabaseUser.user_metadata?.avatar_url || null,
    emailVerified: supabaseUser.app_metadata?.email_confirmed || false
  };
};

// Supabase Auth Provider
export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { language, translations } = useLanguage();
  const t = translations[language] || translations.en;

  // Initial auth check
  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const mappedUser = mapSupabaseUser(session.user);
        setUser(mappedUser);
      }
      
      setIsLoading(false);
      
      // Setup auth state change listener
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        (event, session) => {
          const mappedUser = session ? mapSupabaseUser(session.user) : null;
          setUser(mappedUser);
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initAuth();
  }, []);

  // Login with email/password
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      toast({
        title: t.loginSuccessful || "Login successful",
        description: t.welcomeBack || "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: t.loginFailed || "Login failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth login
  const googleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast({
        title: t.googleLoginFailed || "Google login failed",
        description: error.message || "Could not log in with Google. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup with email/password
  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name,
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: t.accountCreated || "Account created",
        description: t.welcomeToApp || "Welcome to ArgoMind!",
      });
      
      // Create user settings upon signup
      if (data.user) {
        await supabase.from('user_settings').insert([{
          user_id: data.user.id,
          plant_reminders: true,
          community_activity: true,
          new_features: true,
          marketing: false,
          language: language,
          theme: 'light'
        }]);
      }
    } catch (error: any) {
      toast({
        title: t.signUpFailed || "Sign up failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      
      toast({
        title: t.loggedOut || "Logged out",
        description: t.loggedOutDesc || "You have been logged out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Send email verification
  const sendVerificationEmail = async () => {
    setIsLoading(true);
    try {
      if (!user?.email) throw new Error("No email address");
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });
      
      if (error) throw error;
      
      toast({
        title: t.verificationEmailSent || "Verification email sent",
        description: t.verificationEmailSentDesc || "Please check your inbox and verify your email.",
      });
      
      return Promise.resolve();
    } catch (error: any) {
      toast({
        title: t.verificationEmailFailed || "Failed to send verification email",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder for verifyEmail
  const verifyEmail = async (email: string) => {
    // In Supabase, verification is handled via email links
    // This function now just resends the verification email
    return sendVerificationEmail();
  };

  return (
    <SupabaseAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        googleLogin,
        signUp,
        logout,
        verifyEmail,
        sendVerificationEmail
      }}
    >
      {children}
    </SupabaseAuthContext.Provider>
  );
};

// Hook to use auth context
export const useSupabaseAuth = () => {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error("useSupabaseAuth must be used within a SupabaseAuthProvider");
  }
  return context;
};

// Export the hook directly
export const useAuth = useSupabaseAuth;
