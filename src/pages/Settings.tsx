
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, Key, LogOut, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { SettingsProvider } from "@/components/settings/SettingsProvider";
import ProfileTab from "@/components/settings/ProfileTab";
import NotificationsTab from "@/components/settings/NotificationsTab";
import PrivacyTab from "@/components/settings/PrivacyTab";
import SecurityTab from "@/components/settings/SecurityTab";
import LanguageTab from "@/components/settings/LanguageTab";
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-plant-dark plant-section">{t.settings}</h1>
          
          {!isAuthenticated ? (
            <LoginPrompt />
          ) : (
            <SettingsProvider>
              <Tabs defaultValue="profile" className="plant-section">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {t.profile}
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    {t.notifications}
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    {t.privacy}
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center">
                    <Key className="mr-2 h-4 w-4" />
                    {t.security}
                  </TabsTrigger>
                  <TabsTrigger value="language" className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    {t.language}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <ProfileTab />
                </TabsContent>
                
                <TabsContent value="notifications">
                  <NotificationsTab />
                </TabsContent>
                
                <TabsContent value="privacy">
                  <PrivacyTab />
                </TabsContent>
                
                <TabsContent value="security">
                  <SecurityTab />
                </TabsContent>
                
                <TabsContent value="language">
                  <LanguageTab />
                </TabsContent>
              </Tabs>
              
              {/* Logout button for authenticated users */}
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  className="text-red-600 border-red-200 hover:bg-red-50"
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
