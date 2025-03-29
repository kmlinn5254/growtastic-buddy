
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/hooks/useLanguage";
import { useSettings } from "./SettingsProvider";

const NotificationsTab = () => {
  const { language, translations } = useLanguage();
  const t = translations[language] || translations.en;
  
  const { notifications, handleNotificationChange } = useSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.notificationSettings}</CardTitle>
        <CardDescription>
          {t.notificationSettingsDesc}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium">Plant Care Reminders</h4>
            <p className="text-sm text-gray-500">
              Receive reminders about watering, fertilizing, and other plant care tasks.
            </p>
          </div>
          <Switch
            checked={notifications.plantReminders}
            onCheckedChange={() => handleNotificationChange("plantReminders")}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium">Community Activity</h4>
            <p className="text-sm text-gray-500">
              Get notified about comments, likes, and shares on your posts.
            </p>
          </div>
          <Switch
            checked={notifications.communityActivity}
            onCheckedChange={() => handleNotificationChange("communityActivity")}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium">New Features & Updates</h4>
            <p className="text-sm text-gray-500">
              Stay informed about new features, improvements, and app updates.
            </p>
          </div>
          <Switch
            checked={notifications.newFeatures}
            onCheckedChange={() => handleNotificationChange("newFeatures")}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium">Marketing & Promotions</h4>
            <p className="text-sm text-gray-500">
              Receive offers, promotions, and marketing communications.
            </p>
          </div>
          <Switch
            checked={notifications.marketing}
            onCheckedChange={() => handleNotificationChange("marketing")}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
