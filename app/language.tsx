"use client";
import Label from "@/components/shared/label";
import i18n from "@/next-i18next.config";
import { useTranslation } from "react-i18next";

const options = [
  { label: "中文", value: "zh" },
  { label: "English", value: "eh" },
];
export default function LanguageConfig() {
  const { t } = useTranslation("draw");

  return (
    <div className="flex items-center justify-between space-x-2">
      <Label htmlFor="image-generation">
        <div className=" text-slate-600 font-bold">{t("language")}</div>
      </Label>
      <select
        className="text-sm"
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}>
        {options.map((label, key) => (
          <option key={key} value={label.value}>
            {label.label}
          </option>
        ))}
      </select>
    </div>
  );
}
