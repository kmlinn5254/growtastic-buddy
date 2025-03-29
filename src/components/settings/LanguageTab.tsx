
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { LanguageCode, useLanguage } from "@/hooks/useLanguage";

const LanguageTab = () => {
  const { language, setLanguage, languageOptions, translations } = useLanguage();
  const { toast } = useToast();
  const t = translations[language] || translations.en;

  const handleLanguageChange = (value: string) => {
    setLanguage(value as LanguageCode);
    
    toast({
      title: t.languageChanged,
      description: `${t.languageChangedTo} ${languageOptions.find(option => option.value === value)?.label}`,
    });
  };

  return (
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
  );
};

export default LanguageTab;
