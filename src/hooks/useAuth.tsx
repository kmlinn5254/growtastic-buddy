
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

type User = {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  emailVerified?: boolean;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { language, translations } = useLanguage();
  const t = translations[language] || translations.en;

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function - would be replaced with real auth service
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation (in production this would be handled by auth service)
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      const mockUser: User = {
        id: "user-1",
        email,
        name: email.split('@')[0],
        emailVerified: false
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      toast({
        title: t.loginSuccessful || "Login successful",
        description: t.welcomeBack || "Welcome back!",
      });
    } catch (error) {
      toast({
        title: t.loginFailed || "Login failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock Google login
  const googleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: "google-user-1",
        email: "user@gmail.com",
        name: "Google User",
        photoURL: "https://lh3.googleusercontent.com/a/default-user=s120-c",
        emailVerified: true
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      toast({
        title: t.googleLoginSuccessful || "Google login successful",
        description: t.welcomeBack || "Welcome back!",
      });
    } catch (error) {
      toast({
        title: t.googleLoginFailed || "Google login failed",
        description: t.googleLoginFailedDesc || "Could not log in with Google. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation (in production this would be handled by auth service)
      if (!email || !password || !name) {
        throw new Error("All fields are required");
      }
      
      const mockUser: User = {
        id: "new-user-1",
        email,
        name,
        emailVerified: false
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      toast({
        title: t.accountCreated || "Account created",
        description: t.welcomeToApp || "Welcome to ArgoMind!",
      });
    } catch (error) {
      toast({
        title: t.signUpFailed || "Sign up failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: t.loggedOut || "Logged out",
      description: t.loggedOutDesc || "You have been logged out successfully.",
    });
  };

  // Email verification
  const verifyEmail = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send an email verification link
      // For mock purposes, we'll just update the user status
      if (user) {
        const updatedUser = {
          ...user,
          emailVerified: true
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      return Promise.resolve();
    } catch (error) {
      toast({
        title: t.verificationFailed || "Verification failed",
        description: t.verificationFailedDesc || "Could not send verification email. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Send verification email
  const sendVerificationEmail = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t.verificationEmailSent || "Verification email sent",
        description: t.verificationEmailSentDesc || "Please check your inbox and verify your email.",
      });
      
      return Promise.resolve();
    } catch (error) {
      toast({
        title: t.verificationEmailFailed || "Failed to send verification email",
        description: t.verificationEmailFailedDesc || "Please try again later.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
