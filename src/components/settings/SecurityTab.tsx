
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, LogOut } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const SecurityTab = () => {
  const { language, translations } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.securitySettings}</CardTitle>
        <CardDescription>
          {t.securitySettingsDesc}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" className="plant-input" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" className="plant-input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" className="plant-input" />
          </div>
        </div>
        
        <div className="pt-2">
          <Button className="bg-plant-primary hover:bg-plant-dark">
            Update Password
          </Button>
        </div>
        
        <div className="pt-6 border-t mt-6">
          <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start text-amber-600 border-amber-200 hover:bg-amber-50">
              <Shield className="mr-2 h-5 w-5" />
              Enable Two-Factor Authentication
            </Button>
            
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out of All Devices
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;
