
"use client"

import * as React from "react"
import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const [language, setLanguage] = React.useState("English")

  // This is a UI-only demonstration.
  // In a real application, you would use an i18n library like `next-intl`
  // and a hook to change the application's locale.
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    // Here you would call a function to change the locale.
    // For example: router.push(pathname, { locale: lang.toLowerCase().slice(0, 2) });
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("English")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("Hindi")}>
          हिन्दी (Hindi)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("Bengali")}>
          বাংলা (Bengali)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("Tamil")}>
          தமிழ் (Tamil)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("Telugu")}>
          తెలుగు (Telugu)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("Marathi")}>
          मराठी (Marathi)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
