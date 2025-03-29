
import { createContext } from "react";
import { AuthContextType } from "./types";

// Context for auth state
export const SupabaseAuthContext = createContext<AuthContextType | undefined>(undefined);
