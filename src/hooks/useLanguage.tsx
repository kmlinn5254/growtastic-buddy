import React, { createContext, useContext, useState } from "react";

export type LanguageCode = "en" | "es" | "fr" | "my";

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
    { value: "my", label: "Burmese", nativeName: "မြန်မာဘာသာ" },
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
    my: {
      settings: "ဆက်တင်များ",
      profile: "ပရိုဖိုင်",
      notifications: "အသိပေးချက်များ",
      privacy: "လုံခြုံမှု",
      security: "လုံခြုံရေး",
      language: "ဘာသာစကား",
      theme: "အပြင်အဆင်",
      appSettings: "အက်ပ်ဆက်တင်များ",
      profileSettings: "ပရိုဖိုင်ဆက်တင်များ",
      profileSettingsDesc: "သင့်ပရိုဖိုင်အချက်အလက်နှင့် နှစ်သက်မှုများကို စီမံပါ။",
      changeProfilePicture: "ပရိုဖိုင်ဓာတ်ပုံပြောင်းပါ",
      cancel: "ပယ်ဖျက်ပါ",
      saveChanges: "ပြောင်းလဲမှုများကို သိမ်းပါ",
      updating: "အပ်ဒိတ်လုပ်နေသည်...",
      notificationSettings: "အသိပေးချက်ဆက်တင်များ",
      notificationSettingsDesc: "သင့်အသိပေးချက်ဆက်တင်များကို စီမံပါ။",
      enabled: "ဖွင့်ထားသည်",
      disabled: "ပိတ်ထားသည်",
      notificationSettingsUpdated: "အသိပေးချက်ဆက်တင်များ အပ်ဒိတ်လုပ်ပြီးပါပြီ",
      privacySettings: "လုံခြုံမှုဆက်တင်များ",
      privacySettingsDesc: "သင့်လုံခြုံမှုဆက်တင်များနှင့် ဒေတာနှစ်သက်မှုများကို စီမံပါ။",
      securitySettings: "လုံခြုံရေးဆက်တင်များ",
      securitySettingsDesc: "သင့်စကားဝှက်ကို အပ်ဒိတ်လုပ်ပြီး အကောင့်လုံခြုံရေးကို စီမံပါ။",
      languageSettings: "ဘာသာစကားဆက်တင်များ",
      languageSettingsDesc: "အက်ပ်အတွက် သင်နှစ်သက်သော ဘာသာစကားကို ရွေးချယ်ပါ။",
      themeSettings: "အပြင်အဆင်ဆက်တင်များ",
      themeSettingsDesc: "အက်ပလီကေးရှင်း၏ အသွင်အပြင်ကို ပြောင်းလဲပါ။",
      darkMode: "မှောင်မိုက်ပုံစံ",
      lightMode: "လင်းလက်ပုံစံ",
      darkModeDesc: "လက်ရှိအသုံးပြုနေသည်မှာ မှောင်မိုက်ပုံစံဖြစ်သည်။ လင်းလက်ပုံစံသို့ ပြောင်းရန် နှိပ်ပါ။",
      lightModeDesc: "လက်ရှိအသုံးပြုနေသည်မှာ လင်းလက်ပုံစံဖြစ်သည်။ မှောင်မိုက်ပုံစံသို့ ပြောင်းရန် နှိပ်ပါ။",
      switchToLight: "လင်းလက်ပုံစံသို့ ပြောင်းပါ",
      switchToDark: "မှောင်မိုက်ပုံစံသို့ ပြောင်းပါ",
      selectLanguage: "ဘာသာစကားရွေးချယ်ပါ",
      languageNote: "ဘာသာစကားပြောင်းခြင်းသည် အက်ပ်တစ်ခုလုံးရှိ စာသားများကို အပ်ဒိတ်လုပ်ပေးပါမည်။",
      languagePreferencesSaved: "ဘာသာစကားနှစ်သက်မှုများ သိမ်းဆည်းပြီးပါပြီ",
      languagePreferencesSavedDesc: "သင့်ဘာသာစကားနှစ်သက်မှုများကို သိမ်းဆည်းပြီးပါပြီ။",
      profileUpdated: "ပရိုဖိုင်အပ်ဒိတ်လုပ်ပြီးပါပြီ",
      profileUpdatedDesc: "သင့်ပရိုဖိုင်ကို အောင်မြင်စွာ အပ်ဒိတ်လုပ်ပြီးပါပြီ။",
      profilePictureUpdated: "ပရိုဖိုင်ဓာတ်ပုံ အပ်ဒိတ်လုပ်ပြီးပါပြီ",
      profilePictureUpdatedDesc: "သင့်ပရိုဖိုင်ဓာတ်ပုံကို အပ်ဒိတ်လုပ်ပြီးပါပြီ။",
      languageChanged: "ဘာသာစကား ပြောင်းလဲပြီးပါပြီ",
      languageChangedTo: "ဘာသာစကားကို ပြောင်းလဲပြီးပါပြီ -",
      loginRequired: "လော့ဂ်အင်လိုအပ်သည်",
      loginToAccessSettings: "သင့်ဆက်တင်များကို ဝင်ရောက်ကြည့်ရှုရန်နှင့် သင့်အတွေ့အကြုံကို စိတ်ကြိုက်ပြုလုပ်ရန် ကျေးဇူးပြု၍ လော့ဂ်အင်ဝင်ပါ။",
      login: "လော့ဂ်အင်",
      logout: "ထွက်ခွာရန်",
      saveLanguagePreferences: "ဘာသာစကားနှစ်သက်မှုများကို သိမ်းဆည်းရန်",
      darkModeEnabled: "မှောင်မိုက်ပုံစံ ဖွင့်ထားသည်",
      darkModeEnabledDesc: "မှောင်မိုက်ပုံစံကို အသုံးပြုပြီးပါပြီ။",
      lightModeEnabled: "လင်းလက်ပုံစံ ဖွင့်ထားသည်",
      lightModeEnabledDesc: "လင်းလက်ပုံစံကို အသုံးပြုပြီးပါပြီ။"
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
