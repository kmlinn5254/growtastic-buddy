
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/hooks/useLanguage";
import { useSettings } from "./SettingsProvider";

const ProfileTab = () => {
  const { language, translations } = useLanguage();
  const t = translations[language] || translations.en;
  
  const {
    username,
    setUsername,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    isUpdating,
    profilePicture,
    handleProfileUpdate,
    handleProfilePictureClick,
    handleFileChange,
    fileInputRef
  } = useSettings();

  return (
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
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
                <Input 
                  id="firstName" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="plant-input" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} 
                  className="plant-input" 
                />
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
  );
};

export default ProfileTab;
