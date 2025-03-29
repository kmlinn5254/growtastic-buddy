
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, User } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Navigation from "@/components/Navigation";
import LoginForm from "@/components/login/LoginForm";
import SignupForm from "@/components/login/SignupForm";
import GoogleLoginButton from "@/components/login/GoogleLoginButton";
import AuthDivider from "@/components/login/AuthDivider";

const Login = () => {
  const { isLoading } = useAuth();
  const { translations } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("login");
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-plant-dark">
            {activeTab === "login" ? "Login" : "Create Account"}
          </h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>
                    Login to your account to continue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LoginForm isLoading={isLoading} />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <AuthDivider />
                  <GoogleLoginButton isLoading={isLoading} />
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create an Account</CardTitle>
                  <CardDescription>
                    Sign up to start tracking your plants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SignupForm isLoading={isLoading} />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <AuthDivider />
                  <GoogleLoginButton isLoading={isLoading} />
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Login;
