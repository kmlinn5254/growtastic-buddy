import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";

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
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
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
  
  const nameParts = username.split(" ");
  const [firstName, setFirstName] = useState(nameParts[0] || "");
  const [lastName, setLastName] = useState(nameParts.slice(1).join(" ") || "");
  
  const t = translations[language] || translations.en;
  
  const [notifications, setNotifications] = useState({
    plantReminders: true,
    communityActivity: true,
    newFeatures: true,
    marketing: false
  });
  
  useEffect(() => {
    if (user) {
      setUsername(user.name);
      setEmail(user.email);
      
      const parts = user.name.split(" ");
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
      
      if (user.photoURL) {
        setProfilePicture(user.photoURL);
      }
      
      fetchUserSettings(user.id);
    }
  }, [user]);
  
  useEffect(() => {
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    if (fullName && fullName !== username) {
      setUsername(fullName);
    }
  }, [firstName, lastName]);
  
  const fetchUserSettings = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user settings:', error);
        return;
      }
      
      if (data) {
        setNotifications({
          plantReminders: data.plant_reminders,
          communityActivity: data.community_activity,
          newFeatures: data.new_features,
          marketing: data.marketing
        });
      } else {
        await supabase.from('user_settings').insert([{
          user_id: userId,
          plant_reminders: true,
          community_activity: true,
          new_features: true,
          marketing: false,
          language: language,
          theme: 'light'
        }]);
      }
    } catch (error) {
      console.error('Error fetching user settings:', error);
    }
  };
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsUpdating(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: username
        }
      });
      
      if (error) throw error;
      
      if (profilePicture && profilePicture.startsWith('blob:')) {
        const response = await fetch(profilePicture);
        const blob = await response.blob();
        
        const fileName = `avatars/${user.id}-${Date.now()}.jpg`;
        const { data, error: uploadError } = await supabase.storage
          .from('profiles')
          .upload(fileName, blob, { upsert: true });
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('profiles')
          .getPublicUrl(fileName);
          
        if (urlData) {
          await supabase.auth.updateUser({
            data: {
              avatar_url: urlData.publicUrl
            }
          });
          
          setProfilePicture(urlData.publicUrl);
        }
      }
      
      toast({
        title: t.profileUpdated,
        description: t.profileUpdatedDesc,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not update profile",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleNotificationChange = async (key: keyof NotificationSettings) => {
    if (!user) return;
    
    try {
      const newSettings = {
        ...notifications,
        [key]: !notifications[key]
      };
      
      setNotifications(newSettings);
      
      const updateData = {
        plant_reminders: newSettings.plantReminders,
        community_activity: newSettings.communityActivity,
        new_features: newSettings.newFeatures,
        marketing: newSettings.marketing
      };
      
      const { error } = await supabase
        .from('user_settings')
        .update(updateData)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      toast({
        title: t.notificationSettingsUpdated,
        description: `${key} ${!notifications[key] ? t.enabled : t.disabled}.`,
      });
    } catch (error: any) {
      setNotifications({...notifications});
      
      toast({
        title: "Error",
        description: error.message || "Could not update notification settings",
        variant: "destructive",
      });
    }
  };

  const handleProfilePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
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
    firstName,
    setFirstName,
    lastName,
    setLastName,
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
