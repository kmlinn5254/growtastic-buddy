
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Mail, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SignupFormProps {
  isLoading: boolean;
}

const SignupForm = ({ isLoading }: SignupFormProps) => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return;
    }
    
    try {
      await signUp(email, password, name);
      navigate("/");
    } catch (error) {
      // Error is handled in useAuth
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Name
          </div>
        </Label>
        <Input 
          id="name" 
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-email">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </div>
        </Label>
        <Input 
          id="signup-email" 
          type="email" 
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-password">
          <div className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            Password
          </div>
        </Label>
        <Input 
          id="signup-password" 
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirm-password">
          <div className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            Confirm Password
          </div>
        </Label>
        <Input 
          id="confirm-password" 
          type="password" 
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-plant-primary hover:bg-plant-dark"
        disabled={isLoading || password !== confirmPassword}
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm;
