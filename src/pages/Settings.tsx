import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { User, Bell, Shield, Key, LogOut, Camera, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";

const Settings = () => {
  const { toast } = useToast();
  const { language, setLanguage, languageOptions, translations } = useLanguage();
  const [username, setUsername] = useState("plant_lover");
  const [email, setEmail] = useState("user@example.com");
  const [isUpdating, setIsUpdating] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [notifications, setNotifications] = useState({
    plantReminders: true,
    communityActivity: true,
    newFeatures: true,
    marketing: false
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast({
        title: translations.profileUpdated,
        description: translations.profileUpdatedDesc,
      });
    }, 1000);
  };
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
    
    toast({
      title: translations.notificationSettingsUpdated,
      description: `${key} ${!notifications[key] ? translations.enabled : translations.disabled}.`,
    });
  };

  const handleProfilePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Create a URL for the selected image file
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
      
      toast({
        title: translations.profilePictureUpdated,
        description: translations.profilePictureUpdatedDesc,
      });
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    
    toast({
      title: translations.languageChanged,
      description: `${translations.languageChangedTo} ${languageOptions.find(option => option.value === value)?.label}`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-plant-dark plant-section">{translations.settings}</h1>
          
          <Tabs defaultValue="profile" className="plant-section">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                {translations.profile}
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                {translations.notifications}
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                {translations.privacy}
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Key className="mr-2 h-4 w-4" />
                {translations.security}
              </TabsTrigger>
              <TabsTrigger value="language" className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                {translations.language}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>{translations.profileSettings}</CardTitle>
                  <CardDescription>
                    {translations.profileSettingsDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="flex items-center gap-6 mb-8">
                      <div 
                        className="relative cursor-pointer" 
                        onClick={handleProfilePictureClick}
                      >
                        <Avatar className="w-24 h-24 border-2 border-gray-200">
                          {profilePicture ? (
                            <AvatarImage src={profilePicture} alt={username} />
                          ) : (
                            <AvatarFallback className="bg-plant-light text-plant-primary text-2xl font-bold">
                              {username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="absolute bottom-0 right-0 p-1 bg-plant-primary text-white rounded-full">
                          <Camera className="h-4 w-4" />
                        </div>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{username}</h3>
                        <p className="text-gray-500">{email}</p>
                        <Button 
                          variant="outline" 
                          type="button"
                          className="mt-2 text-sm h-8"
                          onClick={handleProfilePictureClick}
                        >
                          {translations.changeProfilePicture}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input 
                            id="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="plant-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="plant-input"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Jane" className="plant-input" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Smith" className="plant-input" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea 
                          id="bio" 
                          rows={3}
                          defaultValue="Plant enthusiast with a growing collection of houseplants. Passionate about sustainable gardening and creating green spaces."
                          className="w-full p-2 border border-plant-light rounded-md focus:outline-none focus:ring-2 focus:ring-plant-primary resize-none"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">{translations.cancel}</Button>
                  <Button 
                    className="bg-plant-primary hover:bg-plant-dark"
                    onClick={handleProfileUpdate}
                    disabled={isUpdating}
                  >
                    {isUpdating ? translations.updating : translations.saveChanges}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>{translations.notificationSettings}</CardTitle>
                  <CardDescription>
                    {translations.notificationSettingsDesc}
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
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>{translations.privacySettings}</CardTitle>
                  <CardDescription>
                    {translations.privacySettingsDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Profile Visibility</h4>
                      <p className="text-sm text-gray-500">
                        Make your profile visible to other users.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Show Plant Collection</h4>
                      <p className="text-sm text-gray-500">
                        Allow others to see your plant collection and history.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Data Analytics</h4>
                      <p className="text-sm text-gray-500">
                        Allow anonymous usage data to improve the app experience.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                      Download My Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>{translations.securitySettings}</CardTitle>
                  <CardDescription>
                    {translations.securitySettingsDesc}
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
            </TabsContent>
            
            <TabsContent value="language">
              <Card>
                <CardHeader>
                  <CardTitle>{translations.languageSettings}</CardTitle>
                  <CardDescription>
                    {translations.languageSettingsDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language-select">{translations.selectLanguage}</Label>
                      <Select value={language} onValueChange={handleLanguageChange}>
                        <SelectTrigger id="language-select" className="w-full md:w-[250px]">
                          <SelectValue placeholder={translations.selectLanguage} />
                        </SelectTrigger>
                        <SelectContent>
                          {languageOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-4 text-sm text-gray-500">
                      <p>{translations.languageNote}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="bg-plant-primary hover:bg-plant-dark"
                    onClick={() => toast({
                      title: translations.languagePreferencesSaved,
                      description: translations.languagePreferencesSavedDesc,
                    })}
                  >
                    {translations.saveLanguagePreferences}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
