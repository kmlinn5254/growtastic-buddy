
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

interface NotificationSettings {
  plantReminders: boolean;
  communityActivity: boolean;
  newFeatures: boolean;
  marketing: boolean;
}

interface SettingsContextType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  isUpdating: boolean;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  profilePicture: string | null;
  setProfilePicture: React.Dispatch<React.SetStateAction<string | null>>;
  notifications: NotificationSettings;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationSettings>>;
  handleProfileUpdate: (e: React.FormEvent) => void;
  handleNotificationChange: (key: keyof NotificationSettings) => void;
  handleProfilePictureClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { language, translations } = useLanguage();
  
  const [username, setUsername] = useState(user?.name || "plant_lover");
  const [email, setEmail] = useState(user?.email || "user@example.com");
  const [isUpdating, setIsUpdating] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(user?.photoURL || null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
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

  const value: SettingsContextType = {
    username,
    setUsername,
    email,
    setEmail,
    isUpdating,
    setIsUpdating,
    profilePicture,
    setProfilePicture,
    notifications,
    setNotifications,
    handleProfileUpdate,
    handleNotificationChange,
    handleProfilePictureClick,
    handleFileChange,
    fileInputRef,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
