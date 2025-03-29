
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Shield, Key, Globe, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import NotificationsTab from "./NotificationsTab";
import PrivacyTab from "./PrivacyTab";
import SecurityTab from "./SecurityTab";
import LanguageTab from "./LanguageTab";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AppSettingsTab = () => {
  const { language, translations } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const t = translations[language] || translations.en;
  
  return (
    <div className="space-y-8">
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto py-2 bg-gray-100 dark:bg-gray-700">
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
          <TabsTrigger value="theme" className="flex items-center">
            {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
            {t.theme || "Theme"}
          </TabsTrigger>
        </TabsList>
        
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
    </div>
  );
};

export default AppSettingsTab;
