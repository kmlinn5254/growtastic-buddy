
import { supabase } from "@/lib/supabase";

// Login with email/password
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

// Google OAuth login
export const loginWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
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
