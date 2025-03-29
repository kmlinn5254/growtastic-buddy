
// This file is maintained for backward compatibility
// Import and re-export from our refactored module
import { useAuth } from './auth/useAuth';
import { AuthProvider } from './auth/AuthProvider';
import type { User, AuthContextType } from './auth/types';

export { useAuth, AuthProvider };
export type { User, AuthContextType };
