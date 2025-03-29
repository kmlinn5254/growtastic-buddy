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

  // Google login using browser accounts
  const googleLogin = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would redirect to Google OAuth
      // For our mock implementation, we'll simulate the browser account selection
      
      // Create a dialog for browser account selection
      const selectedAccount = await showBrowserAccountSelectionDialog();
      
      if (!selectedAccount) {
        // User cancelled the account selection
        setIsLoading(false);
        return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: "google-user-" + Date.now(),
        email: selectedAccount.email,
        name: selectedAccount.name,
        photoURL: selectedAccount.photoURL,
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
  
  // Function to show browser account selection dialog
  const showBrowserAccountSelectionDialog = (): Promise<{ email: string; name: string; photoURL: string } | null> => {
    return new Promise((resolve) => {
      // Create a dialog to simulate browser account selection
      const dialog = document.createElement('div');
      dialog.className = 'fixed inset-0 flex items-center justify-center bg-black/50 z-50';
      dialog.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 class="text-xl font-bold mb-4 dark:text-white">Choose an account</h2>
          <p class="text-gray-500 dark:text-gray-400 mb-4">to continue to ArgoMind</p>
          <div class="space-y-2">
            <button class="account-option w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <img src="https://ui-avatars.com/api/?name=Current+User&background=0D8ABC&color=fff" class="w-8 h-8 rounded-full mr-3" />
              <div class="text-left">
                <div class="font-medium dark:text-white">Current User</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">user@gmail.com</div>
              </div>
            </button>
            <button class="account-option w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <img src="https://ui-avatars.com/api/?name=Work+Account&background=4285F4&color=fff" class="w-8 h-8 rounded-full mr-3" />
              <div class="text-left">
                <div class="font-medium dark:text-white">Work Account</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">work@company.com</div>
              </div>
            </button>
            <button class="account-option w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="text-left">
                <div class="font-medium text-blue-600">Use another account</div>
              </div>
            </button>
          </div>
          <button id="cancel-button" class="mt-4 w-full text-center p-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Cancel</button>
        </div>
      `;
      document.body.appendChild(dialog);
      
      // Handle account selection
      const accountOptions = dialog.querySelectorAll('.account-option');
      const cancelButton = dialog.querySelector('#cancel-button');
      
      accountOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
          document.body.removeChild(dialog);
          if (index === 0) {
            resolve({
              email: 'user@gmail.com',
              name: 'Current User',
              photoURL: 'https://ui-avatars.com/api/?name=Current+User&background=0D8ABC&color=fff'
            });
          } else if (index === 1) {
            resolve({
              email: 'work@company.com',
              name: 'Work Account',
              photoURL: 'https://ui-avatars.com/api/?name=Work+Account&background=4285F4&color=fff'
            });
          } else {
            // "Use another account" - would typically open the Google OAuth flow
            // For mock purposes, we'll just use a different account
            resolve({
              email: 'new@example.com',
              name: 'New Account',
              photoURL: 'https://ui-avatars.com/api/?name=New+Account&background=34A853&color=fff'
            });
          }
        });
      });
      
      cancelButton?.addEventListener('click', () => {
        document.body.removeChild(dialog);
        resolve(null);
      });
      
      // Allow clicking outside to cancel
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
          document.body.removeChild(dialog);
          resolve(null);
        }
      });
    });
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
