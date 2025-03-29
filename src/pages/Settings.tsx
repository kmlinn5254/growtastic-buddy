
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { User, Bell, Shield, Key, LogOut } from "lucide-react";
import Navigation from "@/components/Navigation";

const Settings = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState("plant_lover");
  const [email, setEmail] = useState("user@example.com");
  const [isUpdating, setIsUpdating] = useState(false);
  
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
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
    
    toast({
      title: "Notification settings updated",
      description: `${key} notifications ${!notifications[key] ? "enabled" : "disabled"}.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-plant-dark plant-section">Settings</h1>
          
          <Tabs defaultValue="profile" className="plant-section">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Key className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your personal information and account details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-24 h-24 rounded-full bg-plant-light flex items-center justify-center text-plant-primary text-2xl font-bold">
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{username}</h3>
                        <p className="text-gray-500">{email}</p>
                        <Button variant="outline" className="mt-2 text-sm h-8">Change Profile Picture</Button>
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
                  <Button variant="outline">Cancel</Button>
                  <Button 
                    className="bg-plant-primary hover:bg-plant-dark"
                    onClick={handleProfileUpdate}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Control how and when you receive notifications.
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
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control your data and privacy preferences.
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
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and password.
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
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
