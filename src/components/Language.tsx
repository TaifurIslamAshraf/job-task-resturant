"use client";

import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Language = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "Arabic" },
    { code: "tr", label: "Turkish" },
    { code: "bn", label: "Bangla" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLanguage = languages.find(
    (lang) => lang.code === selectedLang
  )?.label;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-md"
      >
        <Globe className="h-5 w-5" />
        <span className="text-sm">{selectedLanguage}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 px-2 bg-white rounded-md shadow-lg py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                setSelectedLang(lang.code);
                setIsOpen(false);
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Language;
