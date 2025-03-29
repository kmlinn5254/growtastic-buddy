
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, LogOut, Moon, Sun, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const SecurityTab = () => {
  const { language, translations } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, verifyEmail } = useAuth();
  const { toast } = useToast();
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const t = translations[language] || translations.en;

  const handleVerifyEmail = async () => {
    if (!user?.email) return;
    
    try {
      await verifyEmail(user.email);
      setIsVerificationSent(true);
      toast({
        title: t.verificationEmailSent,
        description: t.verificationEmailSentDesc,
      });
    } catch (error) {
      toast({
        title: t.errorSendingVerification,
        description: t.tryAgainLater,
        variant: "destructive",
      });
    }
  };

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
        
        <div className="pt-6 border-t mt-6 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>

          {/* Theme toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex items-center">
              {theme === 'dark' ? <Moon className="mr-2 h-5 w-5" /> : <Sun className="mr-2 h-5 w-5" />}
              <div>
                <h4 className="font-medium">{t.darkMode}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {theme === 'dark' ? t.darkModeEnabled : t.lightModeEnabled}
                </p>
              </div>
            </div>
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={toggleTheme} 
            />
          </div>
          
          {/* Email verification */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              <div>
                <h4 className="font-medium">{t.verifyEmail}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.emailVerified ? t.emailVerified : t.emailNotVerified}
                </p>
              </div>
            </div>
            {!user?.emailVerified && (
              <Button 
                variant="outline" 
                className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={handleVerifyEmail}
                disabled={isVerificationSent}
              >
                {isVerificationSent ? t.verificationSent : t.sendVerification}
              </Button>
            )}
          </div>
          
          <div className="space-y-4 pt-2">
            <Button variant="outline" className="w-full justify-start text-amber-600 border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Shield className="mr-2 h-5 w-5" />
              {t.enableTwoFactor}
            </Button>
            
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20">
              <LogOut className="mr-2 h-5 w-5" />
              {t.signOutAllDevices}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;
