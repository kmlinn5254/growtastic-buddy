
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink } from "lucide-react";

interface GoogleLoginButtonProps {
  isLoading: boolean;
}

const GoogleLoginButton = ({ isLoading }: GoogleLoginButtonProps) => {
  const { googleLogin } = useAuth();
  const { toast } = useToast();
  
  const handleGoogleLogin = async () => {
    try {
      // Clear browser local storage to prevent stale auth state
      localStorage.clear(); // Clear all local storage to ensure a fresh start
      
      console.log("Starting Google login process from button", {
        currentUrl: window.location.href,
        origin: window.location.origin,
        pathname: window.location.pathname,
      });
      
      const result = await googleLogin();
      
      console.log("Google login response:", result);
      
      if (result?.error) {
        console.error("Google login error in button handler:", result.error);
        throw result.error;
      } else {
        console.log("Google OAuth flow initiated successfully");
        // The OAuth flow will now redirect to Google for authentication
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Function to open Google login in a new tab
  const handleOpenInNewTab = () => {
    const loginUrl = `${window.location.origin}/login?provider=google`;
    window.open(loginUrl, '_blank', 'noopener,noreferrer');
    
    toast({
      title: "Authentication opened",
      description: "Please complete Google sign-in in the new tab."
    });
  };
  
  return (
    <div className="space-y-2 w-full">
      <Button 
        type="button" 
        variant="outline" 
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <svg
          className="mr-2 h-4 w-4"
          viewBox="0 0 24 24"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        Continue with Google
      </Button>
      
      <Button 
        type="button" 
        variant="ghost" 
        className="w-full text-xs flex items-center justify-center text-muted-foreground"
        onClick={handleOpenInNewTab}
      >
        <ExternalLink className="h-3 w-3 mr-1" />
        Open in new tab (if experiencing issues)
      </Button>
      
      <p className="text-xs text-center text-muted-foreground pt-2">
        If authentication fails in this preview, please try opening in a new tab.
      </p>
    </div>
  );
};

export default GoogleLoginButton;
