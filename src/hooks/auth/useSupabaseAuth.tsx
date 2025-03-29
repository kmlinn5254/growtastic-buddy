
import { useState, useEffect, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { User, AuthContextType } from "./types";
import { SupabaseAuthContext } from "./AuthContext";
import { mapSupabaseUser } from "./userMapper";
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
  signUpWithEmailAndPassword,
  createUserSettings,
  logoutUser,
  sendVerificationEmail as sendVerificationEmailAction,
  getCurrentSession,
  setupAuthListener
} from "./authActions";

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
      try {
        // Set up auth state change listener first
        const { data: { subscription } } = await setupAuthListener((user) => {
          console.log("Auth state changed, user:", user ? "logged in" : "logged out");
          const mappedUser = user ? mapSupabaseUser(user) : null;
          setUser(mappedUser);
          setIsLoading(false);
        });
        
        // Then check for existing session
        const { data: { session } } = await getCurrentSession();
        
        if (session) {
          console.log("Existing session found");
          const mappedUser = mapSupabaseUser(session.user);
          setUser(mappedUser);
        } else {
          console.log("No existing session");
        }
        
        setIsLoading(false);
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error initializing auth:", error);
        setIsLoading(false);
      }
    };
    
    initAuth();
  }, []);

  // Login with email/password
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await loginWithEmailAndPassword(email, password);
      
      if (error) throw error;
      
      // Extract user name from data to display in welcome message
      const userName = data.user?.user_metadata?.name || 
                      data.user?.email?.split('@')[0] || 
                      'User';
      
      toast({
        title: t.loginSuccessful || "Login successful",
        description: `${t.welcomeBack || "Welcome back"}, ${userName}!`,
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
      console.log("Initiating Google login from hook");
      const result = await loginWithGoogle();
      
      if (result.error) {
        console.error("Google login error in hook:", result.error);
        throw result.error;
      }
      
      // Auth state change will handle the user update
      return result; // Return the full result to allow error checking in the component
      
    } catch (error: any) {
      console.error("Google login error caught in hook:", error);
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
      const { data, error } = await signUpWithEmailAndPassword(email, password, name);
      
      if (error) throw error;
      
      toast({
        title: t.accountCreated || "Account created",
        description: t.welcomeToApp || "Welcome to ArgoMind!",
      });
      
      // Create user settings upon signup
      if (data.user) {
        await createUserSettings(data.user.id, language);
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
      const { error } = await logoutUser();
      if (error) throw error;
      
      // User will be set to null by the auth state change listener
      
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
      
      const { error } = await sendVerificationEmailAction(user.email);
      
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
