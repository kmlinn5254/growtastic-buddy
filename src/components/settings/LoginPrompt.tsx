
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const LoginPrompt = () => {
  const navigate = useNavigate();
  const { language, translations } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <Card className="text-center py-12 bg-white dark:bg-gray-800 shadow-md">
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center">
          <LogIn className="h-16 w-16 text-plant-primary mb-4" />
          <h2 className="text-2xl font-bold dark:text-white">{t.loginRequired || "Login Required"}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
            {t.loginToAccessSettings || "Please login to access your settings."}
          </p>
        </div>
        
        <Button 
          className="bg-plant-primary hover:bg-plant-dark"
          onClick={() => navigate("/login")}
        >
          <LogIn className="mr-2 h-4 w-4" />
          {t.login || "Login"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginPrompt;
