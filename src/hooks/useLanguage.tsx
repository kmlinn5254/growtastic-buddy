import React, { createContext, useContext, useState } from "react";

export type LanguageCode = "en" | "es" | "fr";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  languageOptions: { value: LanguageCode; label: string; nativeName: string }[];
  translations: { [key: string]: { [key: string]: string } };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>("en");

  const languageOptions: { value: LanguageCode; label: string; nativeName: string }[] = [
    { value: "en", label: "English", nativeName: "English" },
    { value: "es", label: "Spanish", nativeName: "Español" },
    { value: "fr", label: "French", nativeName: "Français" },
  ];

  const translations = {
    en: {
      settings: "Settings",
      profile: "Profile",
      notifications: "Notifications",
      privacy: "Privacy",
      security: "Security",
      language: "Language",
      theme: "Theme",
      appSettings: "App Settings",
      profileSettings: "Profile Settings",
      profileSettingsDesc: "Manage your profile information and preferences.",
      changeProfilePicture: "Change Profile Picture",
      cancel: "Cancel",
      saveChanges: "Save Changes",
      updating: "Updating...",
      notificationSettings: "Notification Settings",
      notificationSettingsDesc: "Configure your notification preferences.",
      enabled: "enabled",
      disabled: "disabled",
      notificationSettingsUpdated: "Notification settings updated",
      privacySettings: "Privacy Settings",
      privacySettingsDesc: "Manage your privacy settings and data preferences.",
      securitySettings: "Security Settings",
      securitySettingsDesc: "Update your password and manage account security.",
      languageSettings: "Language Settings",
      languageSettingsDesc: "Select your preferred language for the app.",
      themeSettings: "Theme Settings",
      themeSettingsDesc: "Change the appearance of the application.",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      darkModeDesc: "Currently using dark theme. Click to switch to light mode.",
      lightModeDesc: "Currently using light theme. Click to switch to dark mode.",
      switchToLight: "Switch to Light Mode",
      switchToDark: "Switch to Dark Mode",
      selectLanguage: "Select Language",
      languageNote: "Changing the language will update the text throughout the app.",
      languagePreferencesSaved: "Language preferences saved",
      languagePreferencesSavedDesc: "Your language preferences have been saved.",
      profileUpdated: "Profile Updated",
      profileUpdatedDesc: "Your profile has been updated successfully.",
      profilePictureUpdated: "Profile Picture Updated",
      profilePictureUpdatedDesc: "Your profile picture has been updated.",
      languageChanged: "Language Changed",
      languageChangedTo: "Language changed to",
      loginRequired: "Login Required",
      loginToAccessSettings: "Please login to access your settings and personalize your experience.",
      login: "Login",
      logout: "Logout",
      saveLanguagePreferences: "Save Language Preferences",
      darkModeEnabled: "Dark Mode Enabled",
      darkModeEnabledDesc: "Dark mode has been applied.",
      lightModeEnabled: "Light Mode Enabled",
      lightModeEnabledDesc: "Light mode has been applied."
    },
    es: {
      settings: "Configuración",
      profile: "Perfil",
      notifications: "Notificaciones",
      privacy: "Privacidad",
      security: "Seguridad",
      language: "Idioma",
      theme: "Tema",
      appSettings: "Ajustes de la Aplicación",
      themeSettings: "Ajustes de Tema",
      themeSettingsDesc: "Cambiar la apariencia de la aplicación.",
      darkMode: "Modo Oscuro",
      lightMode: "Modo Claro",
      darkModeDesc: "Actualmente usando tema oscuro. Haga clic para cambiar al modo claro.",
      lightModeDesc: "Actualmente usando tema claro. Haga clic para cambiar al modo oscuro.",
      switchToLight: "Cambiar a Modo Claro",
      switchToDark: "Cambiar a Modo Oscuro",
      darkModeEnabled: "Modo Oscuro Activado",
      darkModeEnabledDesc: "El modo oscuro ha sido aplicado.",
      lightModeEnabled: "Modo Claro Activado",
      lightModeEnabledDesc: "El modo claro ha sido aplicado."
    },
    fr: {
      settings: "Paramètres",
      profile: "Profil",
      notifications: "Notifications",
      privacy: "Confidentialité",
      security: "Sécurité",
      language: "Langue",
      theme: "Thème",
      appSettings: "Paramètres de l'Application",
      themeSettings: "Paramètres de Thème",
      themeSettingsDesc: "Changer l'apparence de l'application.",
      darkMode: "Mode Sombre",
      lightMode: "Mode Clair",
      darkModeDesc: "Utilisation actuelle du thème sombre. Cliquez pour passer au mode clair.",
      lightModeDesc: "Utilisation actuelle du thème clair. Cliquez pour passer au mode sombre.",
      switchToLight: "Passer au Mode Clair",
      switchToDark: "Passer au Mode Sombre",
      darkModeEnabled: "Mode Sombre Activé",
      darkModeEnabledDesc: "Le mode sombre a été appliqué.",
      lightModeEnabled: "Mode Clair Activé",
      lightModeEnabledDesc: "Le mode clair a été appliqué."
    },
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    languageOptions,
    translations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
