
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings as SettingsIcon, LogOut } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { SettingsProvider } from "@/components/settings/SettingsProvider";
import ProfileTab from "@/components/settings/ProfileTab";
import AppSettingsTab from "@/components/settings/AppSettingsTab";
import LoginPrompt from "@/components/settings/LoginPrompt";

const Settings = () => {
  const { language, translations } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // Get translations for current language
  const t = translations[language] || translations.en;
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-plant-dark dark:text-plant-primary plant-section">{t.settings}</h1>
          
          {!isAuthenticated ? (
            <LoginPrompt />
          ) : (
            <SettingsProvider>
              <Tabs defaultValue="profile" className="plant-section">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 dark:bg-gray-700">
                  <TabsTrigger value="profile" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <User className="mr-2 h-4 w-4" />
                    {t.profile}
                  </TabsTrigger>
                  <TabsTrigger value="app-settings" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    {t.appSettings || "App Settings"}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <ProfileTab />
                </TabsContent>
                
                <TabsContent value="app-settings">
                  <AppSettingsTab />
                </TabsContent>
              </Tabs>
              
              {/* Logout button for authenticated users */}
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800/30 dark:text-red-400 dark:hover:bg-red-900/20"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t.logout}
                </Button>
              </div>
            </SettingsProvider>
          )}
        </div>
      </main>
    </div>
  );
};

export default Settings;
