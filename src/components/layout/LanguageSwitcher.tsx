"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { supportedLanguages } from "@/config/languages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const flags: Record<string, string> = {
  en: "🇺🇸",
  de: "🇩🇪",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentLanguage = supportedLanguages.find(
    (lang) => lang.code === locale
  );

  function handleSelect(code: string) {
    document.cookie = `locale=${code}; path=/; max-age=31536000`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          disabled={isPending}
          aria-label={`Current language: ${currentLanguage?.label}. Click to switch.`}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border/60 px-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-accent/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
        >
          <span aria-hidden="true">{flags[locale]}</span>
          <span>{currentLanguage?.code.toUpperCase()}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[130px]">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className="flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span aria-hidden="true">{flags[lang.code]}</span>
              <span className="text-sm">{lang.label}</span>
            </div>
            {locale === lang.code && (
              <Check className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}