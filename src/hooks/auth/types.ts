
export type User = {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  emailVerified?: boolean;
};

export interface AuthContextType {
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
