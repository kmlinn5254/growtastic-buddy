
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { User, Bell, Shield, Key, LogOut, Camera, Globe, LogIn } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, LanguageCode } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Settings = () => {
  const { toast } = useToast();
  const { language, setLanguage, languageOptions, translations } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // State variables only used when authenticated
  const [username, setUsername] = useState(user?.name || "plant_lover");
  const [email, setEmail] = useState(user?.email || "user@example.com");
  const [isUpdating, setIsUpdating] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(user?.photoURL || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Get translations for current language
  const t = translations[language] || translations.en;
  
  // Update user data if auth state changes
  useEffect(() => {
    if (user) {
      setUsername(user.name);
      setEmail(user.email);
      if (user.photoURL) {
        setProfilePicture(user.photoURL);
      }
    }
  }, [user]);
  
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
        title: t.profileUpdated,
        description: t.profileUpdatedDesc,
      });
    }, 1000);
  };
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
    
    toast({
      title: t.notificationSettingsUpdated,
      description: `${key} ${!notifications[key] ? t.enabled : t.disabled}.`,
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
        title: t.profilePictureUpdated,
        description: t.profilePictureUpdatedDesc,
      });
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as LanguageCode);
    
    toast({
      title: t.languageChanged,
      description: `${t.languageChangedTo} ${languageOptions.find(option => option.value === value)?.label}`,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-plant-dark plant-section">{t.settings}</h1>
            
            <Card className="text-center py-12">
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center">
                  <LogIn className="h-16 w-16 text-plant-primary mb-4" />
                  <h2 className="text-2xl font-bold">{t.loginRequired}</h2>
                  <p className="text-gray-500 mt-2 max-w-md mx-auto">
                    {t.loginToAccessSettings}
                  </p>
                </div>
                
                <Button 
                  className="bg-plant-primary hover:bg-plant-dark"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  {t.login}
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-plant-dark plant-section">{t.settings}</h1>
          
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
              <Card>
                <CardHeader>
                  <CardTitle>{t.profileSettings}</CardTitle>
                  <CardDescription>
                    {t.profileSettingsDesc}
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
                          {t.changeProfilePicture}
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
                  <Button variant="outline">{t.cancel}</Button>
                  <Button 
                    className="bg-plant-primary hover:bg-plant-dark"
                    onClick={handleProfileUpdate}
                    disabled={isUpdating}
                  >
                    {isUpdating ? t.updating : t.saveChanges}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
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
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>{t.privacySettings}</CardTitle>
                  <CardDescription>
                    {t.privacySettingsDesc}
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
            </TabsContent>
            
            <TabsContent value="language">
              <Card>
                <CardHeader>
                  <CardTitle>{t.languageSettings}</CardTitle>
                  <CardDescription>
                    {t.languageSettingsDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language-select">{t.selectLanguage}</Label>
                      <Select value={language} onValueChange={handleLanguageChange}>
                        <SelectTrigger id="language-select" className="w-full md:w-[250px]">
                          <SelectValue placeholder={t.selectLanguage} />
                        </SelectTrigger>
                        <SelectContent>
                          {languageOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label} ({option.nativeName})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-4 text-sm text-gray-500">
                      <p>{t.languageNote}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="bg-plant-primary hover:bg-plant-dark"
                    onClick={() => toast({
                      title: t.languagePreferencesSaved,
                      description: t.languagePreferencesSavedDesc,
                    })}
                  >
                    {t.saveLanguagePreferences}
                  </Button>
                </CardFooter>
              </Card>
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
        </div>
      </main>
    </div>
  );
};

export default Settings;
