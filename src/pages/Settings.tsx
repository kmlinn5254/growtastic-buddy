
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings as SettingsIcon, LogOut, Bell, Shield, Key, Globe, Sun, Moon } from "lucide-react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/useTheme";

const Settings = () => {
  const { language, translations } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
                <TabsList className="grid w-full grid-cols-6 mb-8 bg-gray-100 dark:bg-gray-700 overflow-x-auto flex-nowrap">
                  <TabsTrigger value="profile" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <User className="mr-2 h-4 w-4" />
                    {t.profile}
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <Bell className="mr-2 h-4 w-4" />
                    {t.notifications}
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <Shield className="mr-2 h-4 w-4" />
                    {t.privacy}
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <Key className="mr-2 h-4 w-4" />
                    {t.security}
                  </TabsTrigger>
                  <TabsTrigger value="language" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <Globe className="mr-2 h-4 w-4" />
                    {t.language}
                  </TabsTrigger>
                  <TabsTrigger value="theme" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                    {t.theme || "Theme"}
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
                
                <TabsContent value="theme">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.themeSettings || "Theme Settings"}</CardTitle>
                      <CardDescription>
                        {t.themeSettingsDesc || "Change the appearance of the application."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h4 className="font-medium">{theme === 'dark' ? t.darkMode || "Dark Mode" : t.lightMode || "Light Mode"}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {theme === 'dark' 
                                ? t.darkModeDesc || "Currently using dark theme. Click to switch to light mode." 
                                : t.lightModeDesc || "Currently using light theme. Click to switch to dark mode."}
                            </p>
                          </div>
                          <Button 
                            onClick={toggleTheme}
                            variant="outline"
                            className="gap-2"
                          >
                            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            {theme === 'dark' ? t.switchToLight || "Switch to Light Mode" : t.switchToDark || "Switch to Dark Mode"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
