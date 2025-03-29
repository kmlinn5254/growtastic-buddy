
import { supabase } from "@/integrations/supabase/client";

// Login with email/password
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

// Google OAuth login
export const loginWithGoogle = async () => {
  // For OAuth to work correctly, we need to provide the exact preview URL that Google has whitelisted
  console.log("Initiating Google OAuth flow");
  
  const currentURL = window.location.origin;
  console.log("Current origin:", currentURL);
  
  // Check if there's a provider in the URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const provider = urlParams.get('provider');
  
  // If this is a direct provider request, log it
  if (provider === 'google') {
    console.log("Direct Google auth request detected");
  }
  
  // Don't specify a redirect URL - let Supabase handle it with its built-in callback
  console.log("Using Supabase's default callback URL");
  
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        prompt: 'select_account',
        access_type: 'offline',
      }
    }
  });
};

// Signup with email/password
export const signUpWithEmailAndPassword = async (email: string, password: string, name: string) => {
  return await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        name,
      }
    }
  });
};

// Create user settings upon signup
export const createUserSettings = async (userId: string, language: string) => {
  return await supabase.from('user_settings').insert([{
    user_id: userId,
    plant_reminders: true,
    community_activity: true,
    new_features: true,
    marketing: false,
    language: language,
    theme: 'light'
  }]);
};

// Logout
export const logoutUser = async () => {
  return await supabase.auth.signOut();
};

// Send email verification
export const sendVerificationEmail = async (email: string) => {
  return await supabase.auth.resend({
    type: 'signup',
    email: email,
  });
};

// Get current session
export const getCurrentSession = async () => {
  return await supabase.auth.getSession();
};

// Set up auth state change listener
export const setupAuthListener = async (callback: (user: any) => void) => {
  return await supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(session?.user || null);
    }
  );
};
