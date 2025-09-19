import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true" ? true : false;
  });
  const [lang, setLang] = useState(i18n.language);
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("Settings")}</h1>

      <div className="flex flex-wrap gap-2 items-center justify-between">
        <Label htmlFor="theme">{t("DarkMode")}</Label>
        <Switch
          id="theme"
          checked={darkMode}
          onCheckedChange={setDarkMode}
          className="
            data-[state=unchecked]:bg-gray-300
            data-[state=checked]:bg-blue-600
            [&>span]:bg-white [&>span]:shadow-md [&>span]:w-5 [&>span]:h-5
          "
        />
      </div>

      <div className="flex items-center flex-wrap gap-2 justify-between ">
        <Label>{t("Language")}</Label>
        <Select
          value={lang}
          onValueChange={(val) => {
            setLang(val);
            i18n.changeLanguage(val);
          }}
        >
          <SelectTrigger className="xs:w-25 ">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="ru">
              Русский
            </SelectItem>
            <SelectItem className="cursor-pointer" value="en">
              English
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
