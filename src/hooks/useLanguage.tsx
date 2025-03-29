import { useState, useEffect, createContext, useContext, ReactNode } from "react";

// Available languages
export type LanguageCode = "en" | "es" | "fr" | "de" | "zh" | "my";

// Language option type
export interface LanguageOption {
  value: LanguageCode;
  label: string;
  nativeName: string;
}

// Available language options
export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "en", label: "English", nativeName: "English" },
  { value: "es", label: "Spanish", nativeName: "Español" },
  { value: "fr", label: "French", nativeName: "Français" },
  { value: "de", label: "German", nativeName: "Deutsch" },
  { value: "zh", label: "Chinese", nativeName: "中文" },
  { value: "my", label: "Myanmar", nativeName: "မြန်မာ" },
];

// Translation dictionaries
export const TRANSLATIONS = {
  en: {
    // General
    settings: "Settings",
    cancel: "Cancel",
    save: "Save",
    saveChanges: "Save Changes",
    updating: "Updating...",

    // Tab names
    profile: "Profile",
    notifications: "Notifications",
    privacy: "Privacy",
    security: "Security",
    language: "Language",

    // Profile tab
    profileSettings: "Profile Settings",
    profileSettingsDesc: "Manage your personal information and account details.",
    changeProfilePicture: "Change Profile Picture",
    profileUpdated: "Profile updated",
    profileUpdatedDesc: "Your profile information has been updated successfully.",
    profilePictureUpdated: "Profile picture updated",
    profilePictureUpdatedDesc: "Your profile picture has been updated successfully.",

    // Notifications tab
    notificationSettings: "Notification Settings",
    notificationSettingsDesc: "Control how and when you receive notifications.",
    notificationSettingsUpdated: "Notification settings updated",
    enabled: "enabled",
    disabled: "disabled",

    // Privacy tab
    privacySettings: "Privacy Settings",
    privacySettingsDesc: "Control your data and privacy preferences.",

    // Security tab
    securitySettings: "Security Settings",
    securitySettingsDesc: "Manage your account security and password.",

    // Language tab
    languageSettings: "Language Settings",
    languageSettingsDesc: "Change your language preferences for the application.",
    selectLanguage: "Select Language",
    languageNote: "Changing the language will affect all text throughout the application.",
    languageChanged: "Language changed",
    languageChangedTo: "Application language changed to",
    saveLanguagePreferences: "Save Language Preferences",
    languagePreferencesSaved: "Language preferences saved",
    languagePreferencesSavedDesc: "Your language preferences have been saved successfully.",
  },
  es: {
    // General
    settings: "Configuración",
    cancel: "Cancelar",
    save: "Guardar",
    saveChanges: "Guardar Cambios",
    updating: "Actualizando...",

    // Tab names
    profile: "Perfil",
    notifications: "Notificaciones",
    privacy: "Privacidad",
    security: "Seguridad",
    language: "Idioma",

    // Profile tab
    profileSettings: "Configuración del Perfil",
    profileSettingsDesc: "Administra tu información personal y detalles de la cuenta.",
    changeProfilePicture: "Cambiar Foto de Perfil",
    profileUpdated: "Perfil actualizado",
    profileUpdatedDesc: "Tu información de perfil ha sido actualizada con éxito.",
    profilePictureUpdated: "Foto de perfil actualizada",
    profilePictureUpdatedDesc: "Tu foto de perfil ha sido actualizada con éxito.",

    // Notifications tab
    notificationSettings: "Configuración de Notificaciones",
    notificationSettingsDesc: "Controla cómo y cuándo recibes notificaciones.",
    notificationSettingsUpdated: "Configuración de notificaciones actualizada",
    enabled: "activadas",
    disabled: "desactivadas",

    // Privacy tab
    privacySettings: "Configuración de Privacidad",
    privacySettingsDesc: "Controla tus datos y preferencias de privacidad.",

    // Security tab
    securitySettings: "Configuración de Seguridad",
    securitySettingsDesc: "Administra la seguridad de tu cuenta y contraseña.",

    // Language tab
    languageSettings: "Configuración de Idioma",
    languageSettingsDesc: "Cambia tus preferencias de idioma para la aplicación.",
    selectLanguage: "Seleccionar Idioma",
    languageNote: "Cambiar el idioma afectará todo el texto en la aplicación.",
    languageChanged: "Idioma cambiado",
    languageChangedTo: "El idioma de la aplicación cambió a",
    saveLanguagePreferences: "Guardar Preferencias de Idioma",
    languagePreferencesSaved: "Preferencias de idioma guardadas",
    languagePreferencesSavedDesc: "Tus preferencias de idioma se han guardado con éxito.",
  },
  fr: {
    // General
    settings: "Paramètres",
    cancel: "Annuler",
    save: "Enregistrer",
    saveChanges: "Enregistrer les Modifications",
    updating: "Mise à jour...",

    // Tab names
    profile: "Profil",
    notifications: "Notifications",
    privacy: "Confidentialité",
    security: "Sécurité",
    language: "Langue",

    // Profile tab
    profileSettings: "Paramètres du Profil",
    profileSettingsDesc: "Gérez vos informations personnelles et les détails de votre compte.",
    changeProfilePicture: "Changer la Photo de Profil",
    profileUpdated: "Profil mis à jour",
    profileUpdatedDesc: "Vos informations de profil ont été mises à jour avec succès.",
    profilePictureUpdated: "Photo de profil mise à jour",
    profilePictureUpdatedDesc: "Votre photo de profil a été mise à jour avec succès.",

    // Notifications tab
    notificationSettings: "Paramètres de Notification",
    notificationSettingsDesc: "Contrôlez comment et quand vous recevez des notifications.",
    notificationSettingsUpdated: "Paramètres de notification mis à jour",
    enabled: "activées",
    disabled: "désactivées",

    // Privacy tab
    privacySettings: "Paramètres de Confidentialité",
    privacySettingsDesc: "Contrôlez vos données et préférences de confidentialité.",

    // Security tab
    securitySettings: "Paramètres de Sécurité",
    securitySettingsDesc: "Gérez la sécurité de votre compte et votre mot de passe.",

    // Language tab
    languageSettings: "Paramètres de Langue",
    languageSettingsDesc: "Modifiez vos préférences de langue pour l'application.",
    selectLanguage: "Sélectionner la Langue",
    languageNote: "Changer la langue affectera tout le texte dans l'application.",
    languageChanged: "Langue modifiée",
    languageChangedTo: "La langue de l'application a été changée pour",
    saveLanguagePreferences: "Enregistrer les Préférences de Langue",
    languagePreferencesSaved: "Préférences de langue enregistrées",
    languagePreferencesSavedDesc: "Vos préférences de langue ont été enregistrées avec succès.",
  },
  de: {
    // General
    settings: "Einstellungen",
    cancel: "Abbrechen",
    save: "Speichern",
    saveChanges: "Änderungen Speichern",
    updating: "Aktualisierung...",

    // Tab names
    profile: "Profil",
    notifications: "Benachrichtigungen",
    privacy: "Datenschutz",
    security: "Sicherheit",
    language: "Sprache",

    // Profile tab
    profileSettings: "Profileinstellungen",
    profileSettingsDesc: "Verwalten Sie Ihre persönlichen Informationen und Kontodetails.",
    changeProfilePicture: "Profilbild Ändern",
    profileUpdated: "Profil aktualisiert",
    profileUpdatedDesc: "Ihre Profilinformationen wurden erfolgreich aktualisiert.",
    profilePictureUpdated: "Profilbild aktualisiert",
    profilePictureUpdatedDesc: "Ihr Profilbild wurde erfolgreich aktualisiert.",

    // Notifications tab
    notificationSettings: "Benachrichtigungseinstellungen",
    notificationSettingsDesc: "Kontrollieren Sie, wie und wann Sie Benachrichtigungen erhalten.",
    notificationSettingsUpdated: "Benachrichtigungseinstellungen aktualisiert",
    enabled: "aktiviert",
    disabled: "deaktiviert",

    // Privacy tab
    privacySettings: "Datenschutzeinstellungen",
    privacySettingsDesc: "Kontrollieren Sie Ihre Daten und Datenschutzeinstellungen.",

    // Security tab
    securitySettings: "Sicherheitseinstellungen",
    securitySettingsDesc: "Verwalten Sie die Sicherheit Ihres Kontos und Passworts.",

    // Language tab
    languageSettings: "Spracheinstellungen",
    languageSettingsDesc: "Ändern Sie Ihre Spracheinstellungen für die Anwendung.",
    selectLanguage: "Sprache Auswählen",
    languageNote: "Das Ändern der Sprache wirkt sich auf den gesamten Text in der Anwendung aus.",
    languageChanged: "Sprache geändert",
    languageChangedTo: "Anwendungssprache geändert zu",
    saveLanguagePreferences: "Spracheinstellungen Speichern",
    languagePreferencesSaved: "Spracheinstellungen gespeichert",
    languagePreferencesSavedDesc: "Ihre Spracheinstellungen wurden erfolgreich gespeichert.",
  },
  zh: {
    // General
    settings: "设置",
    cancel: "取消",
    save: "保存",
    saveChanges: "保存更改",
    updating: "更新中...",

    // Tab names
    profile: "个人资料",
    notifications: "通知",
    privacy: "隐私",
    security: "安全",
    language: "语言",

    // Profile tab
    profileSettings: "个人资料设置",
    profileSettingsDesc: "管理您的个人信息和账户详情。",
    changeProfilePicture: "更改头像",
    profileUpdated: "个人资料已更新",
    profileUpdatedDesc: "您的个人资料信息已成功更新。",
    profilePictureUpdated: "头像已更新",
    profilePictureUpdatedDesc: "您的头像已成功更新。",

    // Notifications tab
    notificationSettings: "通知设置",
    notificationSettingsDesc: "控制如何以及何时接收通知。",
    notificationSettingsUpdated: "通知设置已更新",
    enabled: "已启用",
    disabled: "已禁用",

    // Privacy tab
    privacySettings: "隐私设置",
    privacySettingsDesc: "控制您的数据和隐私偏好。",

    // Security tab
    securitySettings: "安全设置",
    securitySettingsDesc: "管理您的账户安全和密码。",

    // Language tab
    languageSettings: "语言设置",
    languageSettingsDesc: "更改应用程序的语言偏好。",
    selectLanguage: "选择语言",
    languageNote: "更改语言将影响应用程序中的所有文本。",
    languageChanged: "语言已更改",
    languageChangedTo: "应用程序语言已更改为",
    saveLanguagePreferences: "保存语言偏好",
    languagePreferencesSaved: "语言偏好已保存",
    languagePreferencesSavedDesc: "您的语言偏好已成功保存。",
  },
  my: {
    // General
    settings: "ဆက်တင်များ",
    cancel: "ပယ်ဖျက်ရန်",
    save: "သိမ်းဆည်းရန်",
    saveChanges: "အပြောင်းအလဲများကို သိမ်းဆည်းရန်",
    updating: "အပ်ဒိတ်လုပ်နေသည်...",

    // Tab names
    profile: "ပရိုဖိုင်း",
    notifications: "အသိပေးချက်များ",
    privacy: "လုံခြုံမှု",
    security: "လုံခြုံရေး",
    language: "ဘာသာစကား",

    // Profile tab
    profileSettings: "ပရိုဖိုင်းဆက်တင်များ",
    profileSettingsDesc: "သင့်ကိုယ်ရေးအချက်အလက်နှင့် အကောင့်အသေးစိတ်ကို စီမံခန့်ခွဲပါ။",
    changeProfilePicture: "ပရိုဖိုင်းပုံပြောင်းရန်",
    profileUpdated: "ပရိုဖိုင်းကို အပ်ဒိတ်လုပ်ပြီးပါပြီ",
    profileUpdatedDesc: "သင့်ပရိုဖိုင်းအချက်အလက်ကို အောင်မြင်စွာ အပ်ဒိတ်လုပ်ပြီးပါပြီ။",
    profilePictureUpdated: "ပရိုဖိုင်းပုံကို အပ်ဒိတ်လုပ်ပြီးပါပြီ",
    profilePictureUpdatedDesc: "သင့်ပရိုဖိုင်းပုံကို အောင်မြင်စွာ အပ်ဒိတ်လုပ်ပြီးပါပြီ။",

    // Notifications tab
    notificationSettings: "အသိပေးချက်ဆက်တင်များ",
    notificationSettingsDesc: "သင်မည်သို့နှင့် မည်သည့်အချိန်တွင် အသိပေးချက်များရရှိမည်ကို ထိန်းချုပ်ပါ။",
    notificationSettingsUpdated: "အသိပေးချက်ဆက်တင်များကို အပ်ဒိတ်လုပ်ပြီးပါပြီ",
    enabled: "ဖွင့်ထားသည်",
    disabled: "ပိတ်ထားသည်",

    // Privacy tab
    privacySettings: "လုံခြုံမှုဆက်တင်များ",
    privacySettingsDesc: "သင့်ဒေတာနှင့် လုံခြုံမှုဦးစားပေးချက်များကို ထိန်းချုပ်ပါ။",

    // Security tab
    securitySettings: "လုံခြုံရေးဆက်တင်များ",
    securitySettingsDesc: "သင့်အကောင့်လုံခြုံရေးနှင့် စကားဝှက်ကို စီမံခန့်ခွဲပါ။",

    // Language tab
    languageSettings: "ဘာသာစကားဆက်တင်များ",
    languageSettingsDesc: "အပလီကေးရှင်းအတွက် သင့်ဘာသာစကားဦးစားပေးချက်များကို ပြောင်းလဲပါ။",
    selectLanguage: "ဘာသာစကားရွေးချယ်ပါ",
    languageNote: "ဘာသာစကားပြောင်းလဲခြင်းသည် အပလီကေးရှင်းတစ်ခုလုံးရှိ စာသားအားလုံးကို သက်ရောက်စေပါမည်။",
    languageChanged: "ဘာသာစကားပြောင်းလဲပြီး",
    languageChangedTo: "အပလီကေးရှင်းဘာသာစကားကို ပြောင်းလဲပြီး",
    saveLanguagePreferences: "ဘာသာစကားဦးစားပေးချက်များကို သိမ်းဆည်းရန်",
    languagePreferencesSaved: "ဘာသာစကားဦးစားပေးချက်များကို သိမ်းဆည်းပြီး",
    languagePreferencesSavedDesc: "သင့်ဘာသာစကားဦးစားပေးချက်များကို အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ။",
  }
};

// Type for the language context
interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  translations: typeof TRANSLATIONS.en;
  languageOptions: typeof LANGUAGE_OPTIONS;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  translations: TRANSLATIONS.en,
  languageOptions: LANGUAGE_OPTIONS,
});

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with browser language or fallback to English
  const getBrowserLanguage = (): LanguageCode => {
    if (typeof window === "undefined") return "en";
    
    const browserLang = navigator.language.split("-")[0] as LanguageCode;
    return TRANSLATIONS[browserLang] ? browserLang : "en";
  };

  // Get stored language or use browser language
  const getInitialLanguage = (): LanguageCode => {
    if (typeof window === "undefined") return "en";
    
    const storedLang = localStorage.getItem("language") as LanguageCode;
    return storedLang && TRANSLATIONS[storedLang] ? storedLang : getBrowserLanguage();
  };

  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage());

  // Update language and save to localStorage
  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  // Get translations for current language
  const translations = TRANSLATIONS[language];

  // Effect to update html lang attribute
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    translations,
    languageOptions: LANGUAGE_OPTIONS,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Default export for the hook
export default useLanguage;
