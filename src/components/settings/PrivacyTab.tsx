
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/hooks/useLanguage";

const PrivacyTab = () => {
  const { language, translations } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <Card className="dark:bg-gray-800 shadow-md">
      <CardHeader>
        <CardTitle className="dark:text-white">{t.privacySettings}</CardTitle>
        <CardDescription className="dark:text-gray-400">
          {t.privacySettingsDesc}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium dark:text-white">Profile Visibility</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Make your profile visible to other users.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium dark:text-white">Show Plant Collection</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Allow others to see your plant collection and history.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium dark:text-white">Data Analytics</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Allow anonymous usage data to improve the app experience.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="pt-4">
          <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-red-800/30 dark:text-red-400">
            Download My Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyTab;
