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

  const languageOptions = [
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
      logout: "Logout"
    },
    es: {
      settings: "Configuración",
      profile: "Perfil",
      notifications: "Notificaciones",
      privacy: "Privacidad",
      security: "Seguridad",
      language: "Idioma",
      profileSettings: "Configuración del Perfil",
      profileSettingsDesc: "Administra tu información de perfil y preferencias.",
      changeProfilePicture: "Cambiar Foto de Perfil",
      cancel: "Cancelar",
      saveChanges: "Guardar Cambios",
      updating: "Actualizando...",
      notificationSettings: "Configuración de Notificaciones",
      notificationSettingsDesc: "Configura tus preferencias de notificación.",
      enabled: "habilitado",
      disabled: "deshabilitado",
      notificationSettingsUpdated: "Configuración de notificaciones actualizada",
      privacySettings: "Configuración de Privacidad",
      privacySettingsDesc: "Administra tu configuración de privacidad y preferencias de datos.",
      securitySettings: "Configuración de Seguridad",
      securitySettingsDesc: "Actualiza tu contraseña y administra la seguridad de la cuenta.",
      languageSettings: "Configuración de Idioma",
      languageSettingsDesc: "Selecciona tu idioma preferido para la aplicación.",
      selectLanguage: "Seleccionar Idioma",
      languageNote: "Cambiar el idioma actualizará el texto en toda la aplicación.",
      languagePreferencesSaved: "Preferencias de idioma guardadas",
      languagePreferencesSavedDesc: "Tus preferencias de idioma han sido guardadas.",
      profileUpdated: "Perfil Actualizado",
      profileUpdatedDesc: "Tu perfil ha sido actualizado exitosamente.",
      profilePictureUpdated: "Foto de Perfil Actualizada",
      profilePictureUpdatedDesc: "Tu foto de perfil ha sido actualizada.",
      languageChanged: "Idioma Cambiado",
      languageChangedTo: "Idioma cambiado a",
      loginRequired: "Inicio de sesión requerido",
      loginToAccessSettings: "Por favor, inicia sesión para acceder a tus ajustes y personalizar tu experiencia.",
      login: "Iniciar sesión",
      logout: "Cerrar sesión"
    },
    fr: {
      settings: "Paramètres",
      profile: "Profil",
      notifications: "Notifications",
      privacy: "Confidentialité",
      security: "Sécurité",
      language: "Langue",
      profileSettings: "Paramètres du Profil",
      profileSettingsDesc: "Gérez vos informations de profil et vos préférences.",
      changeProfilePicture: "Changer la Photo de Profil",
      cancel: "Annuler",
      saveChanges: "Enregistrer les Modifications",
      updating: "Mise à jour...",
      notificationSettings: "Paramètres de Notification",
      notificationSettingsDesc: "Configurez vos préférences de notification.",
      enabled: "activé",
      disabled: "désactivé",
      notificationSettingsUpdated: "Paramètres de notification mis à jour",
      privacySettings: "Paramètres de Confidentialité",
      privacySettingsDesc: "Gérez vos paramètres de confidentialité et vos préférences de données.",
      securitySettings: "Paramètres de Sécurité",
      securitySettingsDesc: "Mettez à jour votre mot de passe et gérez la sécurité du compte.",
      languageSettings: "Paramètres de Langue",
      languageSettingsDesc: "Sélectionnez votre langue préférée pour l'application.",
      selectLanguage: "Sélectionner la Langue",
      languageNote: "Changer la langue mettra à jour le texte dans toute l'application.",
      languagePreferencesSaved: "Préférences de langue enregistrées",
      languagePreferencesSavedDesc: "Vos préférences de langue ont été enregistrées.",
      profileUpdated: "Profil Mis à Jour",
      profileUpdatedDesc: "Votre profil a été mis à jour avec succès.",
      profilePictureUpdated: "Photo de Profil Mise à Jour",
      profilePictureUpdatedDesc: "Votre photo de profil a été mise à jour.",
      languageChanged: "Langue Changée",
      languageChangedTo: "Langue changée en",
      loginRequired: "Connexion requise",
      loginToAccessSettings: "Veuillez vous connecter pour accéder à vos paramètres et personnaliser votre expérience.",
      login: "Connexion",
      logout: "Déconnexion"
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
